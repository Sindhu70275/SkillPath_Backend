import express from "express";
import {
	createSkill,
	updateSkill,
	getSkills,
	getSkillTags,
	getSkillById,
} from "../controllers/skill.controller.js";
import { protect, authorize} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createSkill); 
router.get("/tags", protect, getSkillTags);
router.get("/:id", protect, getSkillById);
router.put("/:id", protect, authorize("admin"), updateSkill);
router.get("/", protect, getSkills);

export default router;
