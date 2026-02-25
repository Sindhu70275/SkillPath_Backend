import Skill from "../models/skill.model.js";

export const createSkillService = async (skillData) => {
  const existingSkill = await Skill.findOne({ title: skillData.title });

  if (existingSkill) {
    throw new Error("Skill with this title already exists");
  }
  const skill = await Skill.create(skillData);
  return skill;
};

export const updateSkillService = async (id, updateData) => {
  const updatedSkill = await Skill.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedSkill;
};

export const getSkillsService = async (query) => {
  const { category, level, search, tags } = query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (level) {
    filter.level = level;
  }

  //options: i makes case-insensitive
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (tags) {
    const tagsArray = tags.split(",");
    filter.tags = { $all: tagsArray };
  }

  const skills = await Skill.find(filter).sort({ createdAt: -1 });
  return skills;
};

export const getSkillByIdService = async (id) => {
  const skillDetail = await Skill.findById(id);
  return skillDetail;
};

export const getSkillTagsService = async () => {
  const skillTags = await Skill.distinct("tags");
  return skillTags;
};
