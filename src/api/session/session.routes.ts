import { Router } from "express";
import { verifyToken, requireAdmin } from "../../middlewares/auth.middleware.js";
import {
  createSessionController,
  joinSessionController,
  setActiveSongController,
  disconnectSessionController,
} from "./session.controller.js";

const router = Router();

// 🔒 Only admin can create, set songs, or quit session
router.post("/", verifyToken, requireAdmin, createSessionController);
router.post("/:id/song", verifyToken, requireAdmin, setActiveSongController);


// ✅ All signed-in users can join and view session
router.post("/:id/join", verifyToken, joinSessionController);
router.post("/:id/disconnect", verifyToken, disconnectSessionController);


export default router;
