import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Project from "../../../models/projectModel";
import Protect from "../../../middleware/protect";
import { saveImageInCloud } from "../../../utils/cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: {
      data: { imageBase64String, modelId },
    },
  } = req;

  if (method !== "POST")
    return res.status(401).json({ message: "Invalid request" });

  if (!imageBase64String || imageBase64String.trim().length < 4000)
    return res.status(400).json({ message: "No image detected" });

  try {
    await connectDB();

    if (modelId) {
      // If the project is already in the database.
      const project = await Project.findById(modelId);
      if (!project)
        return res
          .status(400)
          .json({ message: "Project for the uploaded imaged is not found" });

      const imageResult = await saveImageInCloud(imageBase64String);
      if (imageResult === null)
        return res
          .status(500)
          .json({ message: "Image could not be uploaded for the project" });

      project.images = [imageResult, ...project.images];

      await project.save(); // This can still be extended to delete the image from the cloud if the updated project is not saved in the database.

      return res.json(project);
    } else {
      // If the project has not been saved in the database, i.e. new project

      // 1. save the image to the cloud
      const imageResult = await saveImageInCloud(imageBase64String);
      const newProject = new Project({
        isDraft: true,
        images: [imageResult],
      });

      const savedNewProject = await newProject.save();

      if (!savedNewProject)
        return res
          .status(500)
          .json({ message: "Could not save new project as draft" });
      return res.json(savedNewProject);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
