import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import connectDB from "../../../utils/connectDB";

import User from "../../../models/userModel";
import { CookieOptions } from "../../../utils/cookieOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(403).json({ message: "Only get request expected" });

  try {
    await connectDB();
    await User.findOneAndUpdate(
      { refreshToken: req.cookies.michaelayeni },
      { refreshToken: "" }
    );

    const cookies = new Cookies(req, res);

    // Set cookies to expired
    cookies.set("michaelayeni", "", CookieOptions);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
