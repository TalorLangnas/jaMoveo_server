import Song from "../../models/song.model.js";
export const findSongs = async (query) => {
    return await Song.find({ title: { $regex: query, $options: "i" } });
};
export const findSongById = async (id) => {
    return await Song.findById(id);
};
