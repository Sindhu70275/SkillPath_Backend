import weeklyStatsJob from "./weeklyStats.job.js";

export const initCronJobs = () => {
  weeklyStatsJob();
};
