import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import { UserInterface } from "../../../general-types";
import { ProjectType } from "../../../features/Project/type";
import Project from "../../../models/projectModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { userId } = req.query;
      let user: UserInterface, projects: ProjectType[];

      if (userId) {
        user = await User.findById(userId);

        if (user) {
          projects = await Project.find().sort("-createdAt");
        } else {
          projects = await Project.find({ isPublished: true })
            .sort("-createdAt")
            .select("-isPublished -__v -mainContent");
        }
      } else {
        projects = await Project.find({ isPublished: true })
          .sort("-createdAt")
          .select("-isPublished -__v -mainContent");
      }
      if (!projects)
        return res.status(500).json({
          message: "Something is wrong. Could not get projects at this time",
        });

      if (projects.length === 0) return res.json({ data: [] });

      res.json({ data: projects });
    } catch (err) {
      res.status(500).json({
        message:
          err.message ||
          "Something is wrong. Could not get projects at this time",
      });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
};

export default handler;
