import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const registerService = async (username, emailId, password) => {
  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    throw new Error("User already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    emailId,
    password: hashedPassword,
  });

  const payload = {
    id: user._id,
    role: user.role,
    name: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { user, token };
};

export const loginService = async (emailId, password) => {
  const user = await User.findOne({ emailId });
  if (!user) {
    throw new Error("User do not exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid Password");
  }

  const payload = {
    id: user._id,
    role: user.role,
    name: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { user, token };
};
