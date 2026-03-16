import express from "express";
import {
  getLessonProgressController,
  updateLessonProgressController,
  markLessonCompleteController,
} from "../controllers/lessonProgress.controller.js";

const router = express.Router();

router.get("/lesson/:skillId", getLessonProgressController);
router.put("/:skillId/lesson/:lessonId", updateLessonProgressController);
router.put("/:skillId/lesson/:lessonId/complete", markLessonCompleteController);

export default router;
