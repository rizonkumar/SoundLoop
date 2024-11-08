import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/like", protectRoute, (req, res) => {
  req.auth.user;
  res.send("User Route");
});

export default router;
