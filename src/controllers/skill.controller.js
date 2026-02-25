import {
  createSkillService,
  getSkillsService,
  getSkillTagsService,
} from "../services/skill.service.js";

export const createSkill = async (req, res) => {
  try {
    const skill = await createSkillService(req.body);

    res.status(201).json({
      status: "success",
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const skills = await getSkillsService(req.query);

    res.status(200).json({
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkillTags = async (_req, res, next) => {
  try {
    const skillTags = await getSkillTagsService();

    res.status(200).json(skillTags);
  } catch (error) {
    next(error);
  }
};
