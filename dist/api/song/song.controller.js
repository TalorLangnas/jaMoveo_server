import { findSongs, findSongById } from "./song.service.js";
export const searchSongs = async (req, res) => {
    const { q } = req.query;
    try {
        const songs = await findSongs(q);
        res.json(songs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getSongById = async (req, res) => {
    try {
        const song = await findSongById(req.params.id);
        if (!song)
            return res.status(404).json({ message: "Song not found" });
        res.json(song);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
