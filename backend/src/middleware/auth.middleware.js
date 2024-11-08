import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized access, for access you must be the admin",
        success: false,
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error, success: false });
  }
};
