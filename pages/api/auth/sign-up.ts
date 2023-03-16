import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import createSendToken from "../../../utils/createSendToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(403).json({ message: "Invalid Request" });

  const { username, password } = req.body;

  if (password.trim().length < 6)
    return res
      .status(400)
      .json({ message: "Password cannot be less than 6 characters" });

  // Validating Via Mongoose
  try {
    await connectDB();
    const user = await User.create({
      username,
      password,
    });
    await createSendToken(user, 201, req, res);
  } catch (err) {
    if (err.code === 11000) {
      // I did this to prevent querying the DB for this new username
      return res.status(400).json({ message: "Username is already taken" });
    }

    return res.status(500).json({ message: err.message });
  }
}
