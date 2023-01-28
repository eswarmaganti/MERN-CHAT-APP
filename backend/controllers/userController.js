import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "./../config/generateToken.js";
import {} from "bcrypt";

//@route /api/user/register
//@access public
//@description to register new users

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(400);
    throw new Error(`${email} is already taken`);
  }

  const user = await User.create({ name, email, password, profilePicture });

  if (!user) {
    res.status(400);
    throw new Error(`Unable to create account for ${email}`);
  }
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    token: generateToken(user._id),
  });
});

//@route /api/user/register
//@access public
//@description to register new users

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error(`User with email-${email} not found`);
  }
  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error(`Invalid credentials provided`);
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    profilePicture: user.profilePicture,
    token: generateToken(user._id),
  });
});

//@route /api/user/
//@access private
//@description to fetch / search the available users from DB
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : null;

  if (!keyword) {
    return res.status(200).send([]);
  }

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).send(users);
});
