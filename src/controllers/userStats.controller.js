import {
  getUserStatsService,
  updateWeeklyGoalService,
} from "../services/userStats.service.js";

export const getUserStats = async (req, res, next) => {
  try {
    const stats = await getUserStatsService(req.user.id);

    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWeeklyGoal = async (req, res, next) => {
  try {
    const { weeklyGoal } = req.body;

    const stats = await updateWeeklyGoalService(req.user.id, parseInt(weeklyGoal));

    res.status(200).json({
      status: "success",
      message: "Weekly goal updated successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
