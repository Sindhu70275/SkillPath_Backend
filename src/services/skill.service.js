import Skill from "../models/skill.model.js";
import Enrollment from "../models/enrollment.model.js";

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

export const getSkillsService = async (query, userId) => {
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

  const skills = await Skill.find(filter).sort({ createdAt: -1 }).lean();

  let enrollmentMap = new Map();
  if (userId) {
    const enrollments = await Enrollment.find({ userId }).lean();
    enrollmentMap = new Map(
      enrollments.map((e) => [e.skillId.toString(), e.status]),
    );
  }

  return skills.map((skill) => ({
    ...skill,
    isEnrolled: enrollmentMap.get(skill._id.toString()) === "enrolled",
    isWishlisted: enrollmentMap.get(skill._id.toString()) === "wishlisted",
  }));
};

export const getSkillByIdService = async (id, userId) => {
  const skill = await Skill.findById(id);
  if (!skill) return null;

  let isEnrolled = false;
  if (userId) {
    const enrollment = await Enrollment.findOne({
      userId,
      skillId: id,
      status: "enrolled"
    }).lean();
    isEnrolled = !!enrollment;
  }

  return {
    ...skill.toObject(),
    isEnrolled
  };
};

export const getSkillTagsService = async () => {
  const skillTags = await Skill.distinct("tags");
  return skillTags;
};
