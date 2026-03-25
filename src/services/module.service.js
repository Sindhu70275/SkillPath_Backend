import Module from "../models/module.model.js";
import Skill from "../models/skill.model.js";
import Enrollment from "../models/enrollment.model.js";
import { AppError } from "../utils/AppError.js";
import { transactionWrapper } from "../utils/transactionWrapper.js";

export const createModuleService = async (moduleData) => {
  const skill = await Skill.findById(moduleData.skillId);
  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  const existingModule = await Module.findOne({
    skillId: moduleData.skillId,
    order: moduleData.order,
  });

  if (existingModule) {
    throw new AppError(
      "Module with this order already exists for this skill",
      400,
    );
  }

  return await transactionWrapper(async (session) => {
    const module = await Module.create([moduleData], { session });

    await Skill.findByIdAndUpdate(
      moduleData.skillId,
      {
        $inc: {
          modulesCount: 1,
          durationInSecs: module[0].durationInSecs,
        },
      },
      { session },
    );

    return module[0];
  });
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
  const oldModule = await Module.findById(id).select("durationInSecs skillId");
  if (!oldModule) return null;

  const oldDuration = oldModule.durationInSecs;
  const newDuration = updateData.durationInSecs;
  const delta = newDuration - oldDuration;
  const skillId = oldModule.skillId;

  return await transactionWrapper(async (session) => {
    const updatedModule = await Module.findByIdAndUpdate(id, updateData, {
      new: true,
      session,
    });

    if (delta !== 0 && skillId) {
      await Skill.findByIdAndUpdate(
        skillId,
        {
          $inc: { durationInSecs: delta },
        },
        { session },
      );
    }

    return updatedModule;
  });
};

export const deleteModuleService = async (id) => {
  const module = await Module.findById(id);
  if (!module) return null;

  return await transactionWrapper(async (session) => {
    await Module.findByIdAndDelete(id, { session });

    await Skill.findByIdAndUpdate(
      module.skillId,
      {
        $inc: {
          modulesCount: -1,
          durationInSecs: -module.durationInSecs,
        },
      },
      { session },
    );

    return module;
  });
};
