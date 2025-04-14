import { Router } from "express";
import {
  searchSongController,
  getSongDetailsController,
  getSongById,
} from "./song.controller.js";
import {
  verifyToken,
  requireAdmin,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", verifyToken, requireAdmin, searchSongController);
router.get("/songId", verifyToken, requireAdmin, getSongDetailsController);
router.get("/:id", getSongById);

export default router;
