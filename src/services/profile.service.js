import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { createUserData } from "../utils/tokenUtils.js";

export const updateProfileService = async (userId, fullName, userPhoto) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (fullName !== undefined) {
    user.fullName = fullName.trim();
  }
  if (userPhoto !== undefined) {
    user.userPhoto = userPhoto;
  }

  await user.save();

  return createUserData(user);
};
