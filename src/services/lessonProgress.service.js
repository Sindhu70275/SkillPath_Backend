import Lesson from "../models/lesson.model.js";
import LessonProgress from "../models/lessonProgress.model.js";

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
  lessonId,
  progressPercentage,
  lastWatchedSecond,
) => {
  const progress = await LessonProgress.findOneAndUpdate(
    { userId, lessonId },
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

export const markLessonCompleteService = async (userId, lessonId) => {
  const progress = await LessonProgress.findOneAndUpdate(
    { userId, lessonId },
    {
      isCompleted: true,
      progressPercentage: 100,
      lastWatchedAt: new Date(),
    },
    {
      upsert: true,
      new: true,
    },
  );

  return progress;
};
