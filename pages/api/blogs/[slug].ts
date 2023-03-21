import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      await connectDB();
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.json({ message: "Blog not found" });

      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
}
