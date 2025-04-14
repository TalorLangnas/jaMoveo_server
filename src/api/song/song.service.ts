import fs from "fs/promises";
import path from "path";
import Song, { ISong } from "../../models/song.model.js";
import { fileURLToPath } from "url";
import { Types } from "mongoose";
import { dirname, join } from "path";


export const findSongById = async (id: string) => {
  try {
    const song = await Song.findById(id);
    return song;
  } catch (error) {
    throw error;
  }
};

export const searchSongsService = async (
  searchTerm: string
): Promise<string[]> => {
  try {
    const songs = await Song.find({
      name: { $regex: searchTerm, $options: "i" }, // 'i' makes it case-insensitive
    });
    if (!songs || songs.length === 0) {
      throw new Error("No songs found.");
    }

    const songIds = songs.map((song) =>
      (song._id as Types.ObjectId).toString()
    );
    return songIds;
  } catch (err) {
    throw new Error("Error occurred while searching for the songs.");
  }
};
