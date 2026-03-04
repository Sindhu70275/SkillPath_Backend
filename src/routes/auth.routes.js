import express from "express";
import { refreshToken, register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/refresh", refreshToken);
router.post("/register", register);
router.post("/login", login);

export default router;
