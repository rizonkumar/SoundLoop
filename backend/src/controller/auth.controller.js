import { UserService } from "../services/userService.js";

const userService = new UserService();

export const authCallBack = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    await userService.handleAuthCallback({
      id,
      firstName,
      lastName,
      imageUrl,
    });

    res.status(201).json({
      message: "User authenticated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in authCallBack");
    next(error);
  }
};
