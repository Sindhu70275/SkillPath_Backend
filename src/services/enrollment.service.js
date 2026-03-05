import Enrollment from "../models/enrollment.model.js";
import Skill from "../models/skill.model.js";
import { AppError } from "../utils/AppError.js";

export const enrollSkillService = async (userId, skillId) => {
  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  const existing = await Enrollment.findOne({
    userId,
    skillId,
  });
  if (existing && existing.status === "enrolled") {
    throw new AppError("Already enrolled in this skill", 400);
  }

  if (existing && existing.status === "wishlisted") {
    existing.status = "enrolled";
    existing.enrolledAt = new Date();
    await existing.save();
    return existing;
  }

  const enrollment = await Enrollment.create({
    userId,
    skillId,
    status: "enrolled",
    enrolledAt: new Date(),
  });
  return enrollment;
};

export const unenrollSkillService = async (userId, skillId) => {
  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  const enrollment = await Enrollment.findOne({
    userId,
    skillId,
  });
  if (!enrollment || enrollment.status !== "enrolled") {
    throw new AppError("You are not enrolled in this skill", 400);
  }

  await Enrollment.deleteOne({ _id: enrollment._id });
  return { message: "Unenrolled successfully" };
};

export const addToWishlistService = async (userId, skillId) => {
  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  const existing = await Enrollment.findOne({
    userId,
    skillId,
  });

  if (existing) {
    if (existing.status === "enrolled") {
      throw new AppError("Already enrolled. Cannot wishlist.", 400);
    }
    if (existing.status === "wishlisted") {
      throw new AppError("Already in wishlist", 400);
    }
  }

  const wishlist = await Enrollment.create({
    userId,
    skillId,
    status: "wishlisted",
  });

  return wishlist;
};

export const removeFromWishlistService = async (userId, skillId) => {
  const enrollment = await Enrollment.findOne({
    userId,
    skillId,
  });

  if (!enrollment || enrollment.status !== "wishlisted") {
    throw new AppError("Skill not in wishlist", 400);
  }

  await Enrollment.deleteOne({ _id: enrollment._id });

  return { message: "Removed from wishlist" };
};

export const getUserDashboardService = async (userId, filter = {}) => {
  const enrollments = await Enrollment.find({ userId })
    .populate("skill")
    .lean();

  const enrolled = [];
  const wishlisted = [];

  enrollments.forEach((item) => {
    if (item.status === "enrolled") {
      enrolled.push(item.skill);
    } else if (item.status === "wishlisted") {
      wishlisted.push(item.skill);
    }
  });

  if (filter === "enrolled") {
    return enrolled;
  }
  if (filter === "wishlisted") {
    return wishlisted;
  }

  return { enrolled, wishlisted };
};
