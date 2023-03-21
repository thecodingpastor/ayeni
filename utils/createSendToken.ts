import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import User from "../models/userModel";
import createToken from "./createToken";
import { CookieOptions } from "./cookieOptions";
import { UserInterface } from "../general-types";

const createSendToken = async (
  user: UserInterface,
  statusCode: number,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const accessToken = createToken(user._id, user.role);
  const refreshToken = createToken(user._id, user.role, "refresh");

  try {
    const foundUser = await User.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    const cookies = new Cookies(req, res);
    cookies.set("michaelayeni", refreshToken, CookieOptions);

    user.password = undefined; //Removes password from the output

    return res.status(statusCode).json({
      accessToken,
      foundUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default createSendToken;