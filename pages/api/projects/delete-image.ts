import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Protect from "../../../middleware/protect";
import { deleteImageInCloud } from "../../../utils/cloudinary";
import Project from "../../../models/projectModel";
import { ProjectType } from "../../../features/Project/type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { projectSlug, imageCloudId },
  } = req;
  if (method !== "DELETE")
    return res.status(401).json({ message: "Invalid request" });

  if (!projectSlug || !imageCloudId)
    return res
      .status(400)
      .json({ message: "Something is not right please try again." });

  try {
    await connectDB();

    const project: ProjectType = await Project.findOne({ slug: projectSlug });
    if (!project)
      return res.status(400).json({ message: "Project not found!" });

    // Ensure that you have at least 2 images before deleting one
    if (project.images.length < 3)
      return res.status(400).json({
        message:
          "Project images must be at least 2. Upload a new image then try again.",
      });

    const result = await deleteImageInCloud(imageCloudId as string);
    if (result === null)
      return res
        .status(500)
        .json({ message: "File already deleted or not found." });

    const updatedImages = project.images.filter(
      (img) => img.public_id !== imageCloudId
    );

    project.images = updatedImages;
    // @ts-ignore
    await project.save({ new: true });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
