import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";
import User from "../../../models/userModel";
import { UserInterface } from "../../../general-types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    try {
      let user: UserInterface;

      await connectDB();
      if (userId) {
        user = await User.findById(userId);
      }

      const blogs = await Blog.find(
        user?._id ? {} : { isPublished: true }
      ).sort("-updatedAt");

      if (!blogs)
        return res
          .status(500)
          .json({ message: "Could not fetch blogs at this time" });

      res.json(blogs);
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Could not fetch blogs. Please try later",
      });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
};

export default handler;
