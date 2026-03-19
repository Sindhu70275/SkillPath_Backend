import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "wishlisted"],
      required: true,
    },
    enrolledAt: {
      type: Date,
    },
    lastAccessedLessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
    },
    lastAccessedModuleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      default: null,
    },
    lessonsCompleted: {
      type: Number,
      default: 0,
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
    overallPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Prevents duplicate user-skill pair
enrollmentSchema.index({ userId: 1, skillId: 1 }, { unique: true });
enrollmentSchema.index({ userId: 1, skillId: 1, lastAccessedLessonId: 1 });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
