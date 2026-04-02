import { updateProfileService } from "../services/profile.service.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const userPhoto = req.file?.path;
    const updatedProfile = await updateProfileService(
      req.user.id,
      fullName,
      userPhoto,
    );

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};
