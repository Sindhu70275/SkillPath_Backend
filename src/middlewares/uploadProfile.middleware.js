import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

export const uploadProfile = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "user_profiles",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  }),
});
