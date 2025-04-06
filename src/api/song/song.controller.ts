// src/api/song/song.controller.ts

import { Request, Response } from "express";
import { addSongService, searchSongService } from "../song/song.service";  
import { importSongsService } from "../song/song.service";

// Controller for adding a song
export const addSongController = async (req: Request, res: Response) => {
  const { name, artist, body } = req.body;

  try {
    // Call the service function to add the song
    const newSong = await addSongService(name, artist, body);
    res.status(201).json(newSong);  // Return the created song
  } catch (err) {
    res.status(500).json({ error: "Failed to add song." });
  }
};

// Controller for searching a song by name
export const searchSongController = async (req: Request, res: Response): Promise<void> => {
  
  const songName = req.query.name as string;  // Retrieve song name from the query parameter 'name'
  console.log("req.query.name is:", songName);  //debugging line
  try {
    console.log("enter to searchSongController");  //debugging line
    // Call the service function to search for the song
    const song = await searchSongService(songName);
    if (!song) {
      res.status(404).json({ error: "Song not found" });
    }
    res.json(song);  // Return the found song
  } catch (err) {
    res.status(500).json({ error: "Server error while searching for the song" });
  }
};


export const importSongsController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("enter to importSongsController");  //debugging line
    const result = await importSongsService();
      res.status(201).json({
      message: "Songs imported successfully",
      songs: result
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};