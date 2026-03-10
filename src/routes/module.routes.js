import express from "express";
import {
  createModule,
  getModuleById,
  getModulesBySkillId,
  updateModule,
  deleteModule,
} from "../controllers/module.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createModule);
router.get("/skill/:skillId", getModulesBySkillId);
router.get("/:id", getModuleById);
router.put("/:id", authorize("admin"), updateModule);
router.delete("/:id", authorize("admin"), deleteModule);

export default router;
