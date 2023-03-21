import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";
import slugify from "../../../utils/slugify";
import cloudinary, { saveImageInCloud } from "../../../utils/cloudinary";
import Protect from "../../../middleware/protect";
import ValidateImages, { ImageType } from "../../../utils/validateImage";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, mainContent, tags, images, intro, estimatedReadTime } =
      req.body;

    try {
      // check images not more than 4
      if (images.length < 1)
        return res
          .status(400)
          .json({ message: "Blog must have at least 1 image." });

      const imagesError = [];

      images.forEach((img: ImageType) => {
        imagesError.push(ValidateImages(img));
      });
      // It only gets here when a user is being malicious.
      if (imagesError.includes("error"))
        return res.status(400).json({
          message: `
          <ol>
            <li>1.) Invalid image or images detected.</li>
            <li>2.) Only PNG, JPEG, JPG allowed.</li>
            <li>3.) Max size 1MB.</li>
          </ol>
             `,
        });

      const pendingImageResults = [];
      images.forEach((img: ImageType) => {
        const imageUpload = saveImageInCloud(img?.url);
        pendingImageResults.push(imageUpload);
      });

      const imageResults = await Promise.all(pendingImageResults);

      await connectDB();

      const newProject = await Blog.create({
        title,
        mainContent,
        tags,
        intro,
        estimatedReadTime,
        images: imageResults,
        slug: slugify(title),
      });
      res.json(newProject);
    } catch (err) {
      if (err.code === 11000)
        return res.status(400).json({
          message: `A blog with the title "${title}" already exists. Change the title and re-save.`,
        });

      return res.status(500).json({
        message: err.message || "Could not create blog. Please try later",
      });
    }
  } else if (req.method === "PATCH") {
    const { slug, title, mainContent, tags, images, intro, estimatedReadTime } =
      req.body;

    if (tags.length > 10)
      return res.status(400).json({
        message: "Blog should have 10 tags at most.",
      });

    // check images
    if (images.length < 1)
      return res
        .status(400)
        .json({ message: "Blog must have at least 1 image." });

    let newImages = [];
    if (images?.length > 0) {
      newImages = images.filter((img) => img.name);
    }
    const imagesError = [];
    newImages.forEach((img: ImageType) => {
      imagesError.push(ValidateImages(img));
    });
    // It only gets here when a user is being malicious.
    if (imagesError.includes("error"))
      return res.status(400).json({
        message: `
          <ol>
            <li>1.) Invalid image or images detected.</li>
            <li>2.) Only PNG, JPEG, JPG allowed.</li>
            <li>3.) Max size 1MB.</li>
          </ol>
             `,
      });
    try {
      await connectDB();
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      const pendingImageResults = [];
      if (newImages.length > 0) {
        newImages.forEach((img: ImageType) => {
          const imageUpload = saveImageInCloud(img?.url);
          pendingImageResults.push(imageUpload);
        });
      }
      const newImageResults = await Promise.all(pendingImageResults);
      const updatedBlog = await Blog.findOneAndUpdate(
        { slug },
        {
          title,
          mainContent,
          slug: slugify(title),
          intro,
          tags,
          estimatedReadTime,
          images: [
            ...images.filter((img) => img.public_id),
            ...newImageResults,
          ],
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBlog)
        return res.status(400).json({ message: "Blog not found!" });
      res.json(updatedBlog);
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Something went wrong. Please try later.",
      });
    }
  } else if (req.method === "DELETE") {
    const { slug } = req.query;

    try {
      await connectDB();
      const blog = await Blog.findOneAndDelete({ slug });
      if (!blog)
        return res
          .status(400)
          .json({ message: "That blog cound not be found." });
      if (blog?.images.length > 0) {
        blog.images.forEach(
          async (img) => await cloudinary.uploader.destroy(img.public_id)
        );
      }
      return res.json("Blog deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
};

export default Protect(handler);
