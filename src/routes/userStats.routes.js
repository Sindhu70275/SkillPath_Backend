import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { setWeeklyGoalSchema } from "../validators/userStatsValidator.js";
import {
  getUserStats,
  updateWeeklyGoal,
} from "../controllers/userStats.controller.js";

const router = express.Router();
router.use(protect);

router.get("/", getUserStats);
router.post("/goal", validateBody(setWeeklyGoalSchema), updateWeeklyGoal);

export default router;
