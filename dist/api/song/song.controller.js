"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongById = exports.getSongDetailsController = exports.searchSongController = void 0;
const song_service_js_1 = require("../song/song.service.js");
const song_model_js_1 = __importDefault(require("../../models/song.model.js"));
const searchSongController = async (req, res) => {
    const songName = req.query.name;
    try {
        const song = await (0, song_service_js_1.searchSongsService)(songName);
        if (!song) {
            res.status(404).json({ error: "Song not found" });
        }
        res.json(song);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "Server error while searching for the song" });
    }
};
exports.searchSongController = searchSongController;
const getSongDetailsController = async (req, res) => {
    const songId = req.query.songId;
    try {
        const song = await song_model_js_1.default.findById(songId);
        if (!song) {
            throw new Error("Song not found");
        }
        res.status(200).json({
            name: song.name,
            artist: song.artist,
        });
    }
    catch (err) {
        console.error("Error occurred while fetching song details:", err);
        res.status(500).json({ error: "Server error while fetching song details" });
    }
};
exports.getSongDetailsController = getSongDetailsController;
const getSongById = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await (0, song_service_js_1.findSongById)(id);
        if (!song) {
            res.status(404).json({ error: "Song not found" });
        }
        res.status(200).json(song);
    }
    catch (error) {
        console.error(`Error getting song by ID: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getSongById = getSongById;
