import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Admin Dashboard");
});

export default router;
