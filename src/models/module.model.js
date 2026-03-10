import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  durationInMinutes: Number,
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;
