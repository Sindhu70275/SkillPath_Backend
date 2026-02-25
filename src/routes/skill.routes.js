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
router.get("/tags", getSkillTags);   
router.get("/:id", getSkillById);
router.put("/:id", updateSkill);
router.get("/", getSkills);

export default router;
