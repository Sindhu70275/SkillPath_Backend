import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getUserStatsController } from "../controllers/userStats.controller.js";

const router = express.Router();

router.get("/userStats", protect, getUserStatsController);

export default router;
