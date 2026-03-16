import Lesson from "../models/lesson.model.js";
import LessonProgress from "../models/lessonProgress.model.js";
import { AppError } from "../utils/AppError.js";

export const getLessonProgressService = async (userId, skillId) => {
  const lessons = await Lesson.find({ skillId }).select("_id").lean();
  const lessonIds = lessons.map((l) => l._id);

  const progress = await LessonProgress.find({
    userId,
    lessonId: { $in: lessonIds },
  }).lean();

  return progress;
};

export const updateLessonProgressService = async (
  userId,
  skillId,
  lessonId,
  progressPercentage,
  lastWatchedSecond,
) => {
  const lesson = await Lesson.findOne({ _id: lessonId, skillId });
  if (!lesson) {
    throw new AppError("Lesson not found for the given skill", 404);
  }

  const progress = await LessonProgress.findOneAndUpdate(
    { userId, skillId, lessonId },
    {
      progressPercentage,
      lastWatchedSecond,
    },
    {
      upsert: true,
      new: true,
    },
  );

  return progress;
};

export const markLessonCompleteService = async (userId, skillId, lessonId) => {
  const lesson = await Lesson.findOne({ _id: lessonId, skillId });
  if (!lesson) {
    throw new AppError("Lesson not found for the given skill", 404);
  }

  const progress = await LessonProgress.findOneAndUpdate(
    { userId, skillId, lessonId },
    {
      isCompleted: true,
      progressPercentage: 1,
      lastWatchedAt: new Date(),
    },
    {
      upsert: true,
      new: true,
    },
  );

  return progress;
};

export const getLastActiveLessonBySkillService = async (userId, skillId) => {
  const progress = await LessonProgress.findOne({
    userId,
    skillId,
    lastWatchedAt: { $ne: null },
  })
    .sort({ lastWatchedAt: -1 })
    .populate({
      path: "lessonId",
      populate: {
        path: "moduleId",
        select: "title",
      },
      match: { skillId },
    })
    .lean();

  if (!progress?.lessonId) return null;

  return progress;
};
