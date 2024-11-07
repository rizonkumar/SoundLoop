import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Auth Dashboard");
});

export default router;
