"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSongsService = exports.findSongById = void 0;
const song_model_js_1 = __importDefault(require("../../models/song.model.js"));
const findSongById = async (id) => {
    try {
        const song = await song_model_js_1.default.findById(id);
        return song;
    }
    catch (error) {
        throw error;
    }
};
exports.findSongById = findSongById;
const searchSongsService = async (searchTerm) => {
    try {
        const songs = await song_model_js_1.default.find({
            name: { $regex: searchTerm, $options: "i" }, // 'i' makes it case-insensitive
        });
        if (!songs || songs.length === 0) {
            throw new Error("No songs found.");
        }
        const songIds = songs.map((song) => song._id.toString());
        return songIds;
    }
    catch (err) {
        throw new Error("Error occurred while searching for the songs.");
    }
};
exports.searchSongsService = searchSongsService;
