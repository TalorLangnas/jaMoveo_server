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


export const findSongById = async (id: string) => {
  console.log("enter to findSongById");  //debugging line
  console.log("id is:", id);  //debugging line
  try {
    // Use Mongoose's findById method to get the song
    const song = await Song.findById(id);
    console.log("song is:", song);  //debugging line
    return song;
  } catch (error) {
    throw error; // Propagate the error to be handled by the controller
  }
};


// Function to search for a song by name
export const searchSongsService = async (name: string) => {
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
// export const searchSongsService = async (searchTerm: string): Promise<ISong[]> => {
//   console.log("enter to searchSongsService with searchTerm:", searchTerm);
//   try {
//     // Use a regular expression to match songs by name that contain the search term.
//     const songs = await Song.find({ 
//       name: { $regex: searchTerm, $options: 'i' }  // 'i' makes it case-insensitive
//     });

//     console.log("songs found:", songs);
//     if (!songs || songs.length === 0) {
//       throw new Error("No songs found.");
//     }

//     return songs;
//   } catch (err) {
//     console.error("Error occurred on searchSongsService:", err);
//     throw new Error("Error occurred while searching for the songs.");
//   }
// };

export const importSongsService = async () => {
  try {
    console.log("enter to importSongsService");  //debugging line
    // Define the path to your JSON file (adjust the path as needed)
    const filePath = path.join(__dirname, "..", "..", "public", "data", "tamid_eoav_eoti.json");
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
