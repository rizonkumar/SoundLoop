import { User } from "../models/user.model.js";

export const authCallBack = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    // check if user exists in our database
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      //signup the user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res
      .status(201)
      .json({ message: "User authenticated successfully", success: true });
  } catch (error) {
    console.log("Error in authCallBack");
    next(error);
  }
};
