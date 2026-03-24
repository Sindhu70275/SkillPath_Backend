import mongoose from "mongoose";
import Module from "./module.model.js";

const lessonSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    durationInMinutes: Number,
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// Middleware: auto-populate skillId from module
lessonSchema.pre("save", async function () {
  if (!this.isModified("moduleId")) return;

  const module = await Module.findById(this.moduleId).select("skillId");
  if (module) {
    this.skillId = module.skillId;
  }
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
