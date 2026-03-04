import express from "express";
import {
	createSkill,
	updateSkill,
	getSkills,
	getSkillTags,
	getSkillById,
} from "../controllers/skill.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createSkill);
router.get("/tags", getSkillTags);
router.get("/:id", getSkillById);
router.put("/:id", authorize("admin"), updateSkill);
router.get("/", getSkills);

export default router;
