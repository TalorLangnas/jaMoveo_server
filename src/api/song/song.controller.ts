import { Request, Response } from "express";
import { findSongs, findSongById } from "./song.service.js";

export const searchSongs = async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const songs = await findSongs(q as string);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const song = await findSongById(req.params.id);
    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    res.json(song);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
