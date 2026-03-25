import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    tags: [String],
    durationInSecs: {
      type: Number,
      default: 0,
    },
    modulesCount: Number,
    lessonsCount: Number,
    modules: [
      {
        title: String,
        durationInMinutes: Number,
        order: Number,
      },
    ],
    prerequisites: [String],
    learningOutcomes: [String],
    totalEnrollments: {
      type: Number,
      default: 0,
    },
    activeEnrollments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
