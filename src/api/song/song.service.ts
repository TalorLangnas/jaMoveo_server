import Song from "../../models/song.model.js";

export const findSongs = async (query: string) => {
  return await Song.find({ title: { $regex: query, $options: "i" } });
};

export const findSongById = async (id: string) => {
  return await Song.findById(id);
};
