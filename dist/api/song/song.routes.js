import { Router } from "express";
import { searchSongs, getSongById } from "./song.controller.js";
const router = Router();
router.get("/search", searchSongs);
router.get("/:id", getSongById); // ✅ No error after TS fix
export default router;
