import { SetOption } from "cookies";

export const CookieOptions: SetOption = {
  httpOnly: true,
  sameSite: "strict", // as I am hosting them on the same server
  path: "/",
  // sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: +process.env.REFRESH_TOKEN_MAXAGE!,
};
