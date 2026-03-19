import {
  createSkillService,
  getSkillsService,
  getSkillByIdService,
  getSkillTagsService,
  updateSkillService,
} from "../services/skill.service.js";

export const createSkill = async (req, res, next) => {
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

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedSkill = await updateSkillService(id, updateData);

    if (updatedSkill) {
      res.status(200).json({
        data: updatedSkill,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Skill not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const skills = await getSkillsService(req.query, req.user.id);

    res.status(200).json({
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skillDetails = await getSkillByIdService(id, req.user?.id);

    if (skillDetails) {
      res.status(200).json({
        data: skillDetails,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Skill not found",
      });
    }
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
