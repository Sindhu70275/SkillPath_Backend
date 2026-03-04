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
	},
	{ timeStamps: true },
);

// Prevents duplicate user-skill pair
enrollmentSchema.index({ user: 1, skill: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
