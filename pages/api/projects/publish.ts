import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Project from "../../../models/projectModel";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT")
    return res.status(401).json({ message: "Invalid request" });
  const { slug, isPublished } = req.body;
  if (!slug) return res.status(404).json({ message: "Invalid parameters" });

  try {
    await connectDB();

    const project = await Project.findOneAndUpdate(
      { slug },
      { isPublished: !isPublished },
      { new: true }
    );

    if (!project)
      return res
        .status(404)
        .json({ message: `The project could not be found` });

    res.json({ _id: project._id, isPublished: project.isPublished });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
