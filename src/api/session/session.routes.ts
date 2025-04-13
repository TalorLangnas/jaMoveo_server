import { Router } from "express";
import { verifyToken, requireAdmin } from "../../middlewares/auth.middleware.js";
import {
  createSessionController,
  joinSessionController,
  disconnectSessionController,
} from "./session.controller.js";

const router = Router();

// Admin route
router.post("/", verifyToken, requireAdmin, createSessionController);

// User routes
router.post("/join", verifyToken, joinSessionController);
router.post("/:id/disconnect", verifyToken, disconnectSessionController);


export default router;
