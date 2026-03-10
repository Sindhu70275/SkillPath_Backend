import {
  createLessonService,
  getLessonByIdService,
  getLessonsByModuleIdService,
  updateLessonService,
  deleteLessonService,
} from "../services/lesson.service.js";

export const createLesson = async (req, res, next) => {
  try {
    const lesson = await createLessonService(req.body);

    res.status(201).json({
      status: "success",
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await getLessonByIdService(id);

    if (lesson) {
      res.status(200).json({
        status: "success",
        message: "Lesson retrieved successfully",
        data: lesson,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Lesson not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getLessonsByModuleId = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const lessons = await getLessonsByModuleIdService(moduleId);

    res.status(200).json({
      status: "success",
      message: "Lessons retrieved successfully",
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedLesson = await updateLessonService(id, updateData);

    if (updatedLesson) {
      res.status(200).json({
        status: "success",
        message: "Lesson updated successfully",
        data: updatedLesson,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Lesson not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await deleteLessonService(id);

    if (lesson) {
      res.status(200).json({
        status: "success",
        message: "Lesson deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Lesson not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
