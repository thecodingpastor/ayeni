import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import { ProjectType } from "../../../features/Project/type";
import Project from "../../../models/projectModel";
import slugify from "../../../utils/slugify";
import cloudinary, {
  deleteImageInCloud,
  saveImageInCloud,
} from "../../../utils/cloudinary";
import Protect from "../../../middleware/protect";
import ValidateImages, { ImageType } from "../../../utils/validateImage";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      title,
      description,
      mainContent,
      tags,
      backEndGithubURL,
      frontEndGithubURL,
      videoURL,
      domainName,
      images,
    } = req.body;

    try {
      // check tags not more than 10 or less than 4
      if (tags.length > 10 || tags.length < 4)
        return res
          .status(400)
          .json({ message: "Projects must have between 4 - 10 tags." });

      // check images not more than 4
      if (images.length < 2 || images.length > 4)
        return res
          .status(400)
          .json({ message: "Projects must have between 2 - 4 screenshots." });

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
        // if (!imageUpload.secure_url)
        //   return res.status(500).json({
        //     message: "Could not upload image. Please try again later.",
        //   });
        pendingImageResults.push(imageUpload);
      });

      const imageResults = await Promise.all(pendingImageResults);

      await connectDB();

      const newProject = await Project.create({
        title,
        description,
        backEndGithubURL,
        frontEndGithubURL,
        videoURL,
        tags,
        domainName,
        images: imageResults,
        mainContent,
        slug: slugify(title),
      });
      res.json(newProject);
    } catch (err) {
      if (err.code === 11000)
        return res.status(400).json({
          message: `A project with the title "${title}" already exists. Change the title and re-save.`,
        });

      return res.status(500).json({
        message: err.message || "Could not create project. Please try later",
      });
    }
  } else if (req.method === "PATCH") {
    const {
      title,
      description,
      mainContent,
      tags,
      backEndGithubURL,
      frontEndGithubURL,
      videoURL,
      domainName,
      images,
      slug,
    } = req.body;

    if (tags.length > 10 || tags.length < 4)
      return res.status(400).json({
        message: "Projects must have between 4 - 10 tags.",
      });

    // check images not more than 4
    if (images.length < 2 || images.length > 4)
      return res
        .status(400)
        .json({ message: "Projects must have between 2 - 4 screenshots." });

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
      const project = await Project.findOne({ slug });
      if (!project)
        return res.status(404).json({ message: "Project not found" });
      const pendingImageResults = [];
      newImages.forEach((img: ImageType) => {
        const imageUpload = saveImageInCloud(img?.url);
        // if (!imageUpload.secure_url)
        //   return res.status(500).json({
        //     message: "Could not upload image. Please try again later.",
        //   });
        pendingImageResults.push(imageUpload);
      });
      const newImageResults = await Promise.all(pendingImageResults);

      const updatedProject = await Project.findOneAndUpdate(
        { slug },
        {
          title,
          description,
          backEndGithubURL,
          frontEndGithubURL,
          videoURL,
          tags,
          domainName,
          images: [
            ...images.filter((img) => img.public_id),
            ...newImageResults,
          ],
          mainContent,
          slug: slugify(title),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedProject)
        return res.status(400).json({ message: "Project not found!" });

      res.json(updatedProject);
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Something went wrong. Please try later.",
      });
    }
  } else if (req.method === "DELETE") {
    const { slug } = req.query;

    try {
      await connectDB();
      const project = await Project.findOneAndDelete({ slug });

      if (!project)
        return res
          .status(400)
          .json({ message: "That project cound not be found." });

      if (project?.images.length > 0) {
        project.images.forEach(
          async (img) => await cloudinary.uploader.destroy(img.public_id)
        );
      }

      return res.json("Project deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
};

export default Protect(handler);
