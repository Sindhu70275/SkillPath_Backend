import Lesson from "../models/lesson.model.js";
import Module from "../models/module.model.js";
import LessonProgress from "../models/lessonProgress.model.js";
import Skill from "../models/skill.model.js";
import { AppError } from "../utils/AppError.js";
import { transactionWrapper } from "../utils/transactionWrapper.js";

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

  return await transactionWrapper(async (session) => {
    const lesson = await Lesson.create([lessonData], { session });

    await Skill.findByIdAndUpdate(
      lessonData.skillId,
      {
        $inc: { lessonsCount: 1 },
      },
      { session },
    );

    await Module.findByIdAndUpdate(
      lessonData.moduleId,
      {
        $inc: { durationInSecs: lesson[0].durationInSecs },
      },
      { session },
    );

    return lesson[0];
  });
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
  const oldLesson = await Lesson.findById(id).select("durationInSecs moduleId");
  if (!oldLesson) return null;

  const oldDuration = oldLesson.durationInSecs;
  const newDuration = updateData.durationInSecs;
  const delta = newDuration - oldDuration;
  const moduleId = oldLesson.moduleId;

  return await transactionWrapper(async (session) => {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
      new: true,
      session,
    });

    if (delta !== 0 && moduleId) {
      await Module.findByIdAndUpdate(
        moduleId,
        {
          $inc: { durationInSecs: delta },
        },
        { session },
      );
    }

    return updatedLesson;
  });
};

export const deleteLessonService = async (id) => {
  const lesson = await Lesson.findById(id);
  if (!lesson) return null;

  return await transactionWrapper(async (session) => {
    await Lesson.findByIdAndDelete(id, { session });

    await Skill.findByIdAndUpdate(
      lesson.skillId,
      {
        $inc: { lessonsCount: -1 },
      },
      { session },
    );

    await Module.findByIdAndUpdate(
      lesson.moduleId,
      {
        $inc: { durationInSecs: -lesson.durationInSecs },
      },
      { session },
    );

    return lesson;
  });
};
