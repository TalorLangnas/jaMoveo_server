import { Request, Response } from "express";
import {
  searchSongsService,
  findSongById,
} from "../song/song.service.js";
import Song from "../../models/song.model.js";

export const searchSongController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const songName = req.query.name as string; 
  try {
    const song = await searchSongsService(songName);
    if (!song) {
      res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while searching for the song" });
  }
};

export const getSongDetailsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const songId = req.query.songId as string;
  try {
    const song = await Song.findById(songId);
    if (!song) {
      throw new Error("Song not found"); 
    }
    res.status(200).json({
      name: song.name,
      artist: song.artist,
    });
  } catch (err) {
    console.error("Error occurred while fetching song details:", err);
    res.status(500).json({ error: "Server error while fetching song details" });
  }
};

export const getSongById = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { id } = req.params;
  try {
    const song = await findSongById(id);

    if (!song) {
      res.status(404).json({ error: "Song not found" });
    }


    res.status(200).json(song);
  } catch (error) {
    console.error(`Error getting song by ID: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
