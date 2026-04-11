import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Daily streaks
    currentDailyStreak: {
      type: Number,
      default: 0,
    },
    longestDailyStreak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
    },

    // Weekly goals
    weeklyGoal: {
      type: Number,
      default: 0,
    },
    weeklyCompleted: {
      type: Number,
      default: 0,
    },
    currentWeeklyStreak: {
      type: Number,
      default: 0,
    },
    longestWeeklyStreak: {
      type: Number,
      default: 0,
    },
    goalStartDate: {
      type: Date,
    },
    goalEndDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const UserStats = mongoose.model("UserStats", userStatsSchema);

export default UserStats;
