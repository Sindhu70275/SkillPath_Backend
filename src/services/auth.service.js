import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
  createUserData,
} from "../utils/tokenUtils.js";
import { AppError } from "../utils/AppError.js";

export const refreshTokenService = async (token) => {
  if (!token) {
    throw new AppError("No refresh token", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError("User not found", 401);
  }

  const newAccessToken = generateAccessToken(user);
  return newAccessToken;
};

export const registerService = async (username, emailId, password) => {
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    throw new AppError("Username already taken", 400);
  }
  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    emailId,
    password: hashedPassword,
  });

  const userData = createUserData(user);
  const token = generateAccessToken(user);

  return { userData, token };
};

export const loginService = async (emailId, password) => {
  const user = await User.findOne({ emailId });
  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Invalid password", 400);
  }

  const userData = createUserData(user);
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { userData, token, refreshToken };
};
