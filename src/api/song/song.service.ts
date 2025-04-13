import fs from "fs/promises";
import path from "path";
import Song, { ISong } from "../../models/song.model.js";
import { fileURLToPath } from "url";
import { Types } from "mongoose";
import { dirname, join } from "path";

// // Define __dirname in an ES module environment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

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

// export const importSongsService = async () => {
//   try {
//     const filePath = path.join(
//       __dirname,
//       "..",
//       "..",
//       "public",
//       "data",
//       "tamid_eoav_eoti.json"
//     );
//     const data = await fs.readFile(filePath, "utf8");
//     const songs: ISong[] = JSON.parse(data);
//     const result = await Song.insertMany(songs);
//     return result;
//   } catch (error) {
//     throw new Error(`Error importing songs: ${error}`);
//   }
// };
