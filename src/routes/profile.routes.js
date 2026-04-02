import express from "express";
import { updateProfile } from "../controllers/profile.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { updateProfileSchema } from "../validators/profileValidator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { uploadProfile } from "../middlewares/uploadProfile.middleware.js";

const router = express.Router();

router.use(protect);

router.put(
  "/",
  uploadProfile.single("userPhoto"),
  validateBody(updateProfileSchema),
  updateProfile,
);

export default router;
