import { Router } from "express";
import { verifyToken, requireAdmin } from "../../middlewares/auth.middleware.js";
import {
  createSessionController,
  joinSessionController,
  setActiveSongController,
  quitSessionController,
  getCurrentSessionController
} from "./session.controller.js";

const router = Router();

// 🔒 Only admin can create, set songs, or quit session
router.post("/", verifyToken, requireAdmin, createSessionController);
router.post("/:id/song", verifyToken, requireAdmin, setActiveSongController);
router.post("/:id/quit", verifyToken, requireAdmin, quitSessionController);

// ✅ All signed-in users can join and view session
router.post("/:id/join", verifyToken, joinSessionController);
router.get("/:id", verifyToken, getCurrentSessionController);

export default router;
