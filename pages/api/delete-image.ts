import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../utils/connectDB";
import Protect from "../../middleware/protect";
import { deleteImageInCloud } from "../../utils/cloudinary";
import Project from "../../models/projectModel";
import Blog from "../../models/blogModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { model, slug, imageCloudId },
  } = req;

  if (method !== "DELETE")
    return res.status(401).json({ message: "Invalid request" });

  if (!imageCloudId)
    return res
      .status(400)
      .json({ message: "Something is not right please try again." });

  try {
    await connectDB();

    const DBModel: any =
      model === "project"
        ? await Project.findOne({ slug })
        : await Blog.findOne({ slug });
    if (!DBModel)
      return res.status(400).json({
        message: `${model === "project" ? "Project" : "Blog"} not found!`,
      });

    // Ensure that you have at least 2 images before deleting one
    if (model === "project" && DBModel.images.length < 3)
      return res.status(400).json({
        message:
          "Project images must be at least 2. Upload a new image then try again.",
      });
    // Ensure that you have at least 1 image before deleting one
    if (model === "blog" && DBModel.images.length < 2)
      return res.status(400).json({
        message:
          "Blog images must be at least 1. Upload a new image then try again.",
      });

    const result = await deleteImageInCloud(imageCloudId as string);
    if (result === null)
      return res
        .status(500)
        .json({ message: "File already deleted or not found." });

    const updatedImages = DBModel.images.filter(
      (img) => img.public_id !== imageCloudId
    );

    DBModel.images = updatedImages;
    // @ts-ignore
    await DBModel.save({ new: true });

    res.json(DBModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
