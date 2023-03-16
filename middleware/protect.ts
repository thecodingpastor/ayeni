import { NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel";
import { NextApiRequestWithUser } from "../general-types";

const Protect = (handler: Function) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    // Get token and check if it exists
    let token: string;
    const headAuth = req.headers.authorization;

    if (headAuth && headAuth.startsWith("Bearer")) {
      token = headAuth.split(" ")[1];
    }
    // else if (req.cookies.michaelayeni) {
    //   token = req.cookies.michaelayeni;
    // }

    if (!token) {
      return res.status(401).json({
        message: "Please log in to get access.",
      });
    }

    try {
      // Verify token
      const decoded: JwtPayload = await promisify(jwt.verify)(
        token,
        // @ts-ignore
        process.env.ACCESS_TOKEN_SECRET
      );

      // Check if user exists with refresh token
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: "The user belonging to this token no longer exist.",
        });
      }

      // Grant access to protected route
      req.userId = decoded.id;
      req.userRole = decoded.userRole;

      return handler(req, res);
    } catch (err) {
      // return res.status(403).end() is == res.sendStatus(403) in nodeAPI
      // Pending *************************
      // If the token is expired, allow setting refresh token and new access token
      if (err.name === "TokenExpiredError") return res.status(403).end();
      // else
      // activate logout
      return res.status(401).json({
        message: "Please log in to get access.",
      });
    }
  };
};
export default Protect;
