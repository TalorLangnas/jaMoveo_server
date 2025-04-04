import { Router } from "express";
import { searchSongs, getSongById } from "./song.controller.js";

const router = Router();

router.get("/search", searchSongs);         // ?q=hey
router.get("/:id", getSongById);           // get song data

export default router;
