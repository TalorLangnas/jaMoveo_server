// src/services/socketIo.ts
import { Server, Socket } from 'socket.io';
import http from 'http';
import { findSongById } from '../api/song/song.service.js'; // Import the findSongById function


let songPlaying: boolean = false;
let currSong: any = null; // Initialize song variable to null

// Export a function that initializes Socket.IO with the given server.
export function initSocket(server: http.Server): void {
  const io = new Server(server, {
    cors: {
      connectionStateRecovery: {}, // Enable connection state recovery
      origin: '*', // Adjust the origin to match your client URL in production
      methods: ['GET', 'POST']
    }
  } as any);

  // Socket.IO connection handler
  io.on('connection', (socket: Socket) => {
    console.log('A client connected: ' + socket.id);

    // Listen for start_session event (triggered by admin)
    socket.on('join_session', (data: { sessionId: string, userId?: string }) => {
      socket.join(data.sessionId);
      // Notify everyone in the room that the session has started
      io.to(data.sessionId).emit('user_joined', data);
      if (songPlaying) {
        io.to(data.sessionId).emit('start_song',  { song: currSong });
      }
    });
  
    // Listen for end_session event (triggered by admin)
    socket.on('end_session', (data: { sessionId: string }) => {
      console.log('Session ended by admin:', data);
      // Notify all clients in the room that the session is over
      io.to(data.sessionId).emit('session_ended', data);
    });
  
    // Built-in disconnect event handler
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      // Optionally: check if a disconnected client was the admin and broadcast a session end.
    });

    socket.on('start_song', async (data: { songId: string; sessionId: string }) => {
      console.log("Received start_song event with data:", data);
      try {
        // Retrieve the song using findSongById function
        const song = await findSongById(data.songId);
        console.log("Song found:", song); // Debugging line
        if (song) {
          console.log("Found song:", song);

          // Emit to all clients in the room (including the sender) the song information.
          songPlaying = true;
          currSong = song; // Store the current song

          io.to(data.sessionId).emit('start_song', { song });
        } else {
          console.error(`No song found for id: ${data.songId}`);
        }
      } catch (error) {
        console.error("Error in start_song event:", error);
      }
    })

    // New quit_event listener: broadcast "quit_event" to all clients in the room when one is received.
    socket.on('quit_event', (data: { sessionId: string }) => {
      console.log("Received quit_event from socket", socket.id, "with data:", data);

      songPlaying = false; // Set songPlaying to false when a user quits
      currSong = null; // Reset the current song

      io.to(data.sessionId).emit('quit_event');
      console.log(`Broadcasted quit_event to room ${data.sessionId}`);
    });

    socket.on("disconnect_event", (data: { sessionId: string }) => {      
      // Broadcast "disconnect_event" to all clients in the room (including sender if desired)
      io.to(data.sessionId).emit("disconnect_event");
      // Remove the socket from the room
      io.in(data.sessionId).socketsLeave(data.sessionId); 
    });
  });
  
}
