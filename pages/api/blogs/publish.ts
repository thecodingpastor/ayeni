import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT")
    return res.status(401).json({ message: "Invalid request" });
  const { slug, isPublished } = req.body;
  if (!slug) return res.status(404).json({ message: "Invalid parameters" });

  try {
    await connectDB();

    const blog = await Blog.findOneAndUpdate(
      { slug },
      { isPublished: !isPublished },
      { new: true }
    );

    if (!blog)
      return res.status(404).json({ message: `The blog could not be found` });

    res.json({ _id: blog._id, isPublished: blog.isPublished });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
