import express from "express";
import {
  createLesson,
  getLessonById,
  getLessonsByModuleId,
  updateLesson,
  deleteLesson,
} from "../controllers/lesson.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createLesson);
router.get("/module/:moduleId", getLessonsByModuleId);
router.get("/:id", getLessonById);
router.put("/:id", authorize("admin"), updateLesson);
router.delete("/:id", authorize("admin"), deleteLesson);

export default router;
