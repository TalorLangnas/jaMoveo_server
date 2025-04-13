import { Server, Socket } from "socket.io";
import http from "http";
import { findSongById } from "../api/song/song.service.js";

// Global variables to track the song state
let songPlaying: boolean = false;
let currSong: any = null;

export function initSocket(server: http.Server): void {
  const io = new Server(server, {
    cors: {
      connectionStateRecovery: {}, // Enable connection state recover
      origin: "*", // Adjust the origin to match your client URL in production
      methods: ["GET", "POST"],
    },
  } as any);

  // Socket.IO connection handler
  io.on("connection", (socket: Socket) => {
    // Listen for start_session event (triggered by admin)
    socket.on(
      "join_session",
      (data: { sessionId: string; userId?: string }) => {
        socket.join(data.sessionId);
        io.to(data.sessionId).emit("user_joined", data);
        if (songPlaying) {
          io.to(data.sessionId).emit("start_song", { song: currSong });
        }
      }
    );

    // Listen for end_session event (triggered by admin)
    socket.on("end_session", (data: { sessionId: string }) => {
      io.to(data.sessionId).emit("session_ended", data);
    });

    socket.on("disconnect", () => {});

    // Listen for start_song event (triggered by admin)
    socket.on(
      "start_song",
      async (data: { songId: string; sessionId: string }) => {
        try {
          const song = await findSongById(data.songId);
          if (song) {
            songPlaying = true; // Set songPlaying to true when a song starts
            currSong = song; // Store the current song
            io.to(data.sessionId).emit("start_song", { song });
          } else {
            console.error(`No song found for id: ${data.songId}`);
          }
        } catch (error) {
          console.error("Error in start_song event:", error);
        }
      }
    );

    // Listen for stop_song event (triggered by admin)
    socket.on("quit_event", (data: { sessionId: string }) => {
      songPlaying = false; // Set songPlaying to false when Admin quits
      currSong = null; // Reset the current song
      io.to(data.sessionId).emit("quit_event");
    });

    // Listen for disconnect_event (triggered by admin)
    socket.on("disconnect_event", (data: { sessionId: string }) => {
      io.to(data.sessionId).emit("disconnect_event");
      // Remove the socket from the room
      io.in(data.sessionId).socketsLeave(data.sessionId);
    });
  });
}
