import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
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
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
