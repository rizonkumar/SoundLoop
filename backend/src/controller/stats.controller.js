import { StatsService } from "../services/statsService.js";

const statsService = new StatsService();

export const getStats = async (req, res, next) => {
  try {
    const stats = await statsService.getSystemStats();

    res.status(200).json({
      ...stats,
      success: true,
      message: "System statistics fetched successfully",
    });
  } catch (error) {
    console.error("Error in getStats controller:", error);
    next(error);
  }
};
