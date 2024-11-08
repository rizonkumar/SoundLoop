import { Router } from "express";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  createAlbum,
  createSong,
  deleteSong,
  deleteAlbum,
} from "../controller/admin.controller.js";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

router.post("/album", protectRoute, requireAdmin, createAlbum);
router.delete("/album/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
