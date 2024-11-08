import { UserService } from "../services/userService.js";

const userService = new UserService();

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.auth.userId;
    const users = await userService.getAllUsers(currentUser);

    return res.status(200).json({
      users,
      message: "All users fetched successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
