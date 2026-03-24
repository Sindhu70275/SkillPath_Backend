import Lesson from "../models/lesson.model.js";
import LessonProgress from "../models/lessonProgress.model.js";
import Skill from "../models/skill.model.js";
import { AppError } from "../utils/AppError.js";
import Enrollment from "../models/enrollment.model.js";

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
  const lesson = await Lesson.findOne({ _id: lessonId, skillId }).populate(
    "moduleId",
  );
  if (!lesson) {
    throw new AppError("Lesson not found for the given skill", 404);
  }

  const progress = await LessonProgress.findOneAndUpdate(
    { userId, skillId, lessonId },
    {
      progressPercentage,
      lastWatchedSecond,
      lastWatchedAt: new Date(),
    },
    {
      upsert: true,
      new: true,
    },
  );

  await Enrollment.findOneAndUpdate(
    { userId, skillId },
    {
      lastAccessedLessonId: lessonId,
      lastAccessedModuleId: lesson.moduleId._id,
    },
  );

  return progress;
};

export const markLessonCompleteService = async (userId, skillId, lessonId) => {
  const lesson = await Lesson.findOne({ _id: lessonId, skillId }).populate(
    "moduleId",
  );
  if (!lesson) {
    throw new AppError("Lesson not found for the given skill", 404);
  }

  const existingProgress = await LessonProgress.findOne({
    userId,
    skillId,
    lessonId,
  });
  const wasNotCompleted = !existingProgress?.isCompleted || !existingProgress;

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

  const updateData = {
    lastAccessedLessonId: lessonId,
    lastAccessedModuleId: lesson.moduleId._id,
  };
  if (wasNotCompleted) {
    updateData.$inc = { lessonsCompleted: 1 };
  }

  const enrollment = await Enrollment.findOneAndUpdate(
    { userId, skillId },
    updateData,
    { new: true },
  );

  if (wasNotCompleted) {
    const skill = await Skill.findById(skillId).select("lessonsCount");
    const totalLessons = skill ? skill.lessonsCount : 0;
    const overallPercentage =
      totalLessons > 0
        ? Math.round((enrollment.lessonsCompleted / totalLessons) * 100)
        : 0;

    await Enrollment.findOneAndUpdate(
      { userId, skillId },
      { overallPercentage },
    );
  }

  return { progress, enrollment };
};
