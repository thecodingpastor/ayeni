import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Project from "../../../models/projectModel";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(401).json({ message: "Invalid request" });

  try {
    await connectDB();
    const project = await Project.findOne({ isDraft: true });

    // If there's no draft, no need to send errors.
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
