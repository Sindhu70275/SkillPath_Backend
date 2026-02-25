import express from "express";
import {
  createSkill,
  updateSkill,
  getSkills,
  getSkillTags,
  getSkillById,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/", createSkill);
router.get("/:id", getSkillById);
router.put("/:id", updateSkill);
router.get("/", getSkills);
router.get("/tags", getSkillTags);

export default router;
