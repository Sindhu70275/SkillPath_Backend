import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    progressPercentage: {
      type: Number,
      default: 0,
    },

    lastWatchedSecond: {
      type: Number,
      default: 0,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    lastWatchedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

lessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
const lessonProgress = mongoose.model("LessonProgress", lessonProgressSchema);

export default lessonProgress;
