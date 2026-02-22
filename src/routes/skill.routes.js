import express from "express";
import { createSkill, getSkills } from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/", createSkill);
router.get("/", getSkills);

export default router;
