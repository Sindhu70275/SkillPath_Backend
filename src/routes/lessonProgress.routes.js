import express from "express";
import {
  getLessonProgressController,
  updateLessonProgressController,
  markLessonCompleteController,
  getLatestWatchedLessonController,
  getRecentActivityController,
} from "../controllers/lessonProgress.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/lesson/:skillId", getLessonProgressController);
router.put("/:skillId/lesson/:lessonId", updateLessonProgressController);
router.put("/:skillId/lesson/:lessonId/complete", markLessonCompleteController);
router.get("/latest-watched", getLatestWatchedLessonController);
router.get("/recent", getRecentActivityController);

export default router;
