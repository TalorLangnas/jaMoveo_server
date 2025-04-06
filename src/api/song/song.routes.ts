// src/routes/song.routes.ts

import { Router } from "express";
import { searchSongController, addSongController, importSongsController  } from "./song.controller"; 
import { verifyToken, requireAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/song/search', verifyToken, requireAdmin, searchSongController);

router.post('/song/add', verifyToken, requireAdmin,  addSongController);

router.post('/song/import', importSongsController);

export default router;
