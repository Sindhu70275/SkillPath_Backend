import express from "express";
import { createSkill, getSkills, getSkillTags } from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/", createSkill);
router.get("/", getSkills);
router.get("/tags", getSkillTags)

export default router;
