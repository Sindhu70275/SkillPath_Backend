import express from "express";
import {
  refreshToken,
  register,
  login,
} from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/refresh", refreshToken);
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

export default router;
