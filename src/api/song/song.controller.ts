// src/api/song/song.controller.ts

import { Request, Response } from "express";
import { searchSongService, findSongById, importSongsService } from "../song/song.service";  
import Song from "../../models/song.model"; 

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

// Controller to get song details by song ID
export const getSongDetailsController = async (req: Request, res: Response): Promise<void> => {
  console.log("enter to getSongDetailsController");  //debugging line
  const songId = req.query.songId as string;
  // const { songId } = req.params;  // Retrieve songId from the request parameters
  console.log("songId is:", req);  //debugging line

  try {
    // Find the song by ID in the database
    const song = await Song.findById(songId);
    console.log("return value from Song.findById(songId) is:", song);  //debugging line

    if (!song) {
      throw new Error("Song not found");  // If no song is found, throw an error
    }

    // Return the song details (name, artist, image if available)
    res.status(200).json({
      name: song.name,
      artist: song.artist,
      // imageUrl: song.imageUrl || null,  // If no imageUrl, send null
    });
  } catch (err) {
    console.error("Error occurred while fetching song details:", err);
    res.status(500).json({ error: "Server error while fetching song details" });
  }
};

export const getSongById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Extract the song ID from the URL

  try {
    const song = await findSongById(id);

    if (!song) {
      // If no song is found, respond with a 404
      res.status(404).json({ error: "Song not found" });
    }

    // If a song is found, return it in the response
    res.status(200).json(song);
    console.log("response is:", song);  //debugging line
  } catch (error) {
    console.error(`Error getting song by ID: ${error}`);
    // Return a 500 status for server error
    res.status(500).json({ error: "Internal server error" });
  }
};

