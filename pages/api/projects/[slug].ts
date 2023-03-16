import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Project from "../../../models/projectModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  if (req.method === "GET") {
    try {
      await connectDB();
      const project = await Project.findOne({ slug });
      if (!project) return res.json({ message: "Project not found" });

      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "PUT") {
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
}
