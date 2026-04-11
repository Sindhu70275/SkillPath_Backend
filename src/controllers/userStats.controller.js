import { getUserStats } from "../services/userStats.service.js";

export const getUserStatsController = async (req, res, next) => {
  try {
    const stats = await getUserStats(req.user.id);

    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
