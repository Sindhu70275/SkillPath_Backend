import Module from "../models/module.model.js";
import Skill from "../models/skill.model.js";
import Enrollment from "../models/enrollment.model.js";

export const createModuleService = async (moduleData) => {
  const skill = await Skill.findById(moduleData.skillId);
  if (!skill) {
    throw new Error("Skill not found");
  }

  const existingModule = await Module.findOne({
    skillId: moduleData.skillId,
    order: moduleData.order,
  });

  if (existingModule) {
    throw new Error("Module with this order already exists for this skill");
  }

  const module = await Module.create(moduleData);
  return module;
};

export const getModuleByIdService = async (id) => {
  const module = await Module.findById(id);
  return module;
};

export const getModulesBySkillIdService = async (skillId, userId) => {
  const skill = await Skill.findById(skillId)
    .select(
      "title category durationInHours level description modulesCount lessonsCount",
    )
    .lean();
  const modules = await Module.find({ skillId }).sort({ order: 1 }).lean();

  const enrollment = await Enrollment.findOne({ userId, skillId })
    .select("lastAccessedLessonId lastAccessedModuleId overallPercentage")
    .lean();

  let lastActiveLesson = null;
  if (enrollment?.lastAccessedLessonId && enrollment?.lastAccessedModuleId) {
    lastActiveLesson = {
      lessonId: enrollment.lastAccessedLessonId,
      moduleId: enrollment.lastAccessedModuleId,
    };
  }

  return {
    skill,
    modules,
    lastActiveLesson,
    overallPercentage: enrollment?.overallPercentage || 0,
  };
};

export const updateModuleService = async (id, updateData) => {
  const updatedModule = await Module.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedModule;
};

export const deleteModuleService = async (id) => {
  const module = await Module.findByIdAndDelete(id);
  return module;
};
