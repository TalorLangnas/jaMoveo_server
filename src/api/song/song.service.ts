// src/api/song/song.service.ts

import fs from 'fs/promises';
import path from 'path';
import Song, { ISong } from "../../models/song.model.js";  // Importing the Song model
import { fileURLToPath } from 'url';
import { Types } from 'mongoose';
import { dirname, join } from 'path';

// Define __dirname in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to add a new song to the database
export const addSongService = async (name: string, artist: string, body: any[]) => {
  try {
    // Create a new song using the provided data
    const newSong = new Song({
      name,
      artist,
      body
    });

    // Save the new song to the database
    await newSong.save();

    return newSong;  // Return the saved song
  } catch (err) {
    throw new Error("Error occurred while adding the song.");
  }
};

// Function to search for a song by name
export const searchSongService = async (name: string) => {
  console.log("enter to searchSongService");  //debugging line
  try {
    const song = await Song.findOne({ name });

    console.log("song is:", song);  //debugging line   

    if (!song) {
      throw new Error("Song not found.");
    }

    return (song._id as Types.ObjectId).toString();  // assuming Mongoose _id
  } catch (err) {
    console.error("Error occurred on searchSongService:", err);  //debugging line
    throw new Error("Error occurred while searching for the song.");
  }
};

export const importSongsService = async () => {
  try {
    console.log("enter to importSongsService");  //debugging line
    // Define the path to your JSON file (adjust the path as needed)
    const filePath = path.join(__dirname, "..", "..", "data", "songs.json");
    // Read the file using fs/promises for async/await
    const data = await fs.readFile(filePath, 'utf8');
    // Parse JSON data; expect an array of Song objects
    const songs: ISong[] = JSON.parse(data);
    // Insert songs into the database
    const result = await Song.insertMany(songs);
    return result; // Return the inserted songs
  } catch (error) {
    throw new Error(`Error importing songs: ${error}`);
  }
};


