import { Router } from "express";
import { searchSongs, getSongById } from "./song.controller.js";

const router = Router();

// Search for a song by its title or query
router.get("/search", searchSongs);

// Get a song by its ID (title or unique identifier)
router.get("/:id", getSongById);

export default router;
