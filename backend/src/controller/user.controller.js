import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUser = req.auth.userId;
    const users = await User.find({
      clerkId: { $ne: currentUser },
    });
    return res.status(200).json(users, {
      message: "All users fetched successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
