import {
  getLessonProgressService,
  updateLessonProgressService,
  markLessonCompleteService,
} from "../services/lessonProgress.service.js";

export const getLessonProgressController = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const userId = req.user.id;

    const progress = await getLessonProgressService(userId, skillId);

    res.status(200).json({
      status: "success",
      message: "Lesson progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLessonProgressController = async (req, res, next) => {
  try {
    const { lessonId, skillId } = req.params;
    const { progressPercentage, lastWatchedSecond } = req.body;
    const userId = req.user.id;

    if (progressPercentage === undefined || lastWatchedSecond === undefined) {
      return res.status(400).json({
        status: "error",
        message: "progressPercentage and lastWatchedSecond are required",
      });
    }

    const progress = await updateLessonProgressService(
      userId,
      skillId,
      lessonId,
      progressPercentage,
      lastWatchedSecond,
    );

    res.status(200).json({
      status: "success",
      message: "Lesson progress updated successfully",
      data: progress,
    });
  } catch (error) {
    next(error);
  }
};

export const markLessonCompleteController = async (req, res, next) => {
  try {
    const { lessonId, skillId } = req.params;
    const userId = req.user.id;

    const progress = await markLessonCompleteService(userId, skillId, lessonId);

    res.status(200).json({
      status: "success",
      message: "Lesson marked as completed",
      data: progress,
    });
  } catch (error) {
    next(error);
  }
};
