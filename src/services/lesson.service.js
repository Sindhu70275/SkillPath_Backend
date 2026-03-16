import Lesson from "../models/lesson.model.js";
import Module from "../models/module.model.js";
import LessonProgress from "../models/lessonProgress.model.js";

export const createLessonService = async (lessonData) => {
  const module = await Module.findById(lessonData.moduleId);
  if (!module) {
    throw new Error("Module not found");
  }

  const existingLesson = await Lesson.findOne({
    moduleId: lessonData.moduleId,
    order: lessonData.order,
  });

  if (existingLesson) {
    throw new Error("Lesson with this order already exists for this module");
  }

  const lesson = await Lesson.create(lessonData);
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
  const lesson = await Lesson.findByIdAndDelete(id);
  return lesson;
};
