import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken, createUserData } from "../utils/tokenUtils.js";
import { AppError } from "../utils/AppError.js";

export const registerService = async (username, emailId, password) => {
  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    emailId,
    password: hashedPassword,
  });

  const userData = createUserData(user);
  const token = generateToken(user);

  return { userData, token };
};

export const loginService = async (emailId, password) => {
  const user = await User.findOne({ emailId });
  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Invalid password", 401);
  }

  const userData = createUserData(user);
  const token = generateToken(user);

  return { userData, token };
};
