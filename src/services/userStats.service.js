import UserStats from "../models/userStats.model.js";
import dayjs from "dayjs";

export const createUserStats = async (userId) => {
  let stats = await UserStats.findOne({ userId });

  if (!stats) {
    stats = await UserStats.create({
      userId,
      goalStartDate: dayjs().startOf("week").toDate(),
      goalEndDate: dayjs().endOf("week").toDate(),
    });
  }

  return stats;
};

export const updateDailyStreak = (stats) => {
  const today = dayjs().startOf("day");
  const lastActive = stats.lastActiveDate
    ? dayjs(stats.lastActiveDate).startOf("day")
    : null;

  if (!lastActive) {
    stats.currentDailyStreak = 1;
  } else {
    const diff = today.diff(lastActive, "day");

    if (diff === 0) return stats;
    if (diff === 1) {
      stats.currentDailyStreak += 1;
    } else {
      stats.currentDailyStreak = 1;
    }
  }

  stats.longestDailyStreak = Math.max(
    stats.longestDailyStreak,
    stats.currentDailyStreak,
  );

  stats.lastActiveDate = new Date();
  return stats;
};

export const updateWeeklyProgress = (stats) => {
  const today = dayjs();

  if (today.isAfter(dayjs(stats.goalEndDate))) {
    if (stats.weeklyCompleted >= stats.weeklyGoal) {
      stats.currentWeeklyStreak += 1;
    } else {
      stats.currentWeeklyStreak = 0;
    }

    stats.longestWeeklyStreak = Math.max(
      stats.longestWeeklyStreak,
      stats.currentWeeklyStreak,
    );

    stats.weeklyCompleted = 0;
    stats.goalStartDate = today.startOf("week").toDate();
    stats.goalEndDate = today.endOf("week").toDate();
  }

  stats.weeklyCompleted += 1;
  return stats;
};

export const handleLessonCompletionStats = async (userId) => {
  const stats = await getOrCreateUserStats(userId);

  updateDailyStreak(stats);
  updateWeeklyProgress(stats);

  await stats.save();

  return stats;
};

export const getUserStats = async (userId) => {
  let stats = await UserStats.findOne({ userId });
  if (!stats) {
    stats = await createUserStats(userId);
  }
  return stats;
};
