import Lesson from "../models/lesson.model.js";
import Module from "../models/module.model.js";
import LessonProgress from "../models/lessonProgress.model.js";
import Skill from "../models/skill.model.js";
import { AppError } from "../utils/AppError.js";

export const createLessonService = async (lessonData) => {
  const module = await Module.findById(lessonData.moduleId);
  if (!module) {
    throw new AppError("Module not found", 404);
  }

  const existingLesson = await Lesson.findOne({
    moduleId: lessonData.moduleId,
    order: lessonData.order,
  });

  if (existingLesson) {
    throw new AppError(
      "Lesson with this order already exists for this module",
      400,
    );
  }

  const lesson = await Lesson.create(lessonData);

  await Skill.findByIdAndUpdate(lessonData.skillId, {
    $inc: { lessonsCount: 1 },
  });

  return lesson;
};

export const getLessonByIdService = async (id) => {
  const lesson = await Lesson.findById(id);
  return lesson;
};

export const getLessonsByModuleIdService = async (moduleId, userId) => {
  const lessons = await Lesson.find({ moduleId }).sort({ order: 1 }).lean();

  const progress = await LessonProgress.find({
    userId,
    lessonId: { $in: lessons.map((l) => l._id) },
  }).lean();

  const progressMap = progress.reduce((acc, p) => {
    acc[p.lessonId.toString()] = p;
    return acc;
  }, {});

  return lessons.map((l) => ({
    ...l,
    isCompleted: progressMap[l._id]?.isCompleted || false,
    progressPercentage: progressMap[l._id]?.progressPercentage || 0,
  }));
};

export const updateLessonService = async (id, updateData) => {
  const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedLesson;
};

export const deleteLessonService = async (id) => {
  const lesson = await Lesson.findById(id);
  if (!lesson) return null;

  await Lesson.findByIdAndDelete(id);

  await Skill.findByIdAndUpdate(lesson.skillId, {
    $inc: { lessonsCount: -1 },
  });

  return lesson;
};
