"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
const socket_io_1 = require("socket.io");
const song_service_js_1 = require("../api/song/song.service.js");
// Global variables to track the song state
let songPlaying = false;
let currSong = null;
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            connectionStateRecovery: {}, // Enable connection state recover
            origin: "*", // Adjust the origin to match your client URL in production
            methods: ["GET", "POST"],
        },
    });
    // Socket.IO connection handler
    io.on("connection", (socket) => {
        // Listen for start_session event (triggered by admin)
        socket.on("join_session", (data) => {
            socket.join(data.sessionId);
            io.to(data.sessionId).emit("user_joined", data);
            if (songPlaying) {
                io.to(data.sessionId).emit("start_song", { song: currSong });
            }
        });
        // Listen for end_session event (triggered by admin)
        socket.on("end_session", (data) => {
            io.to(data.sessionId).emit("session_ended", data);
        });
        socket.on("disconnect", () => { });
        // Listen for start_song event (triggered by admin)
        socket.on("start_song", async (data) => {
            try {
                const song = await (0, song_service_js_1.findSongById)(data.songId);
                if (song) {
                    songPlaying = true; // Set songPlaying to true when a song starts
                    currSong = song; // Store the current song
                    io.to(data.sessionId).emit("start_song", { song });
                }
                else {
                    console.error(`No song found for id: ${data.songId}`);
                }
            }
            catch (error) {
                console.error("Error in start_song event:", error);
            }
        });
        // Listen for stop_song event (triggered by admin)
        socket.on("quit_event", (data) => {
            songPlaying = false; // Set songPlaying to false when Admin quits
            currSong = null; // Reset the current song
            io.to(data.sessionId).emit("quit_event");
        });
        // Listen for disconnect_event (triggered by admin)
        socket.on("disconnect_event", (data) => {
            io.to(data.sessionId).emit("disconnect_event");
            // Remove the socket from the room
            io.in(data.sessionId).socketsLeave(data.sessionId);
        });
    });
}
