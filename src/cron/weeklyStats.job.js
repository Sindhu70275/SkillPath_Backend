import cron from "node-cron";
import dayjs from "dayjs";
import UserStats from "../models/userStats.model.js";

const weeklyStatsJob = () => {
  cron.schedule("0 0 * * 0", async () => {
    const statsList = await UserStats.find();

    for (const stats of statsList) {
      if (stats.weeklyCompleted >= stats.weeklyGoal) {
        stats.currentWeeklyStreak += 1;
      } else {
        stats.currentWeeklyStreak = 0;
      }

      stats.weeklyCompleted = 0;
      stats.goalStartDate = dayjs().startOf("week").toDate();
      stats.goalEndDate = dayjs().endOf("week").toDate();

      await stats.save();
    }
  });
};

export default weeklyStatsJob;
