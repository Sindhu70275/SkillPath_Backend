import Module from "../models/module.model.js";
import Skill from "../models/skill.model.js";
import { getLastActiveLessonBySkillService } from "../services/lessonProgress.service.js";

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
    .select("title category durationInHours level description modulesCount lessonsCount")
    .lean();
  const modules = await Module.find({ skillId }).sort({ order: 1 }).lean();

  const lastActiveLesson = await getLastActiveLessonBySkillService(userId, skillId);

  return {
    skill,
    modules,
    lastActiveLesson: lastActiveLesson ? {
      lessonId: lastActiveLesson.lessonId._id,
      moduleId: lastActiveLesson.lessonId.moduleId._id,
      lastWatchedAt: lastActiveLesson.lastWatchedAt
    } : null,
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
