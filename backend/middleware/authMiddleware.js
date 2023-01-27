import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(verified.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not an Authorized User, token verification failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not an Authorized User, token verification failed");
  }
});
export default isAuthenticated;
