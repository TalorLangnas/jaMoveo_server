import { Router } from "express";
import {
  searchSongController,
  importSongsController,
  getSongDetailsController,
  getSongById,
} from "./song.controller.js";
import {
  verifyToken,
  requireAdmin,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", verifyToken, requireAdmin, searchSongController);
router.post("/import", importSongsController);
router.get("/songId", verifyToken, requireAdmin, getSongDetailsController);
router.get("/:id", getSongById);

export default router;
