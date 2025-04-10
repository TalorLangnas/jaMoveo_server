// src/services/socketIo.ts
import { Server, Socket } from 'socket.io';
import http from 'http';
import { findSongById } from '../api/song/song.service.js'; // Import the findSongById function

// Export a function that initializes Socket.IO with the given server.
export function initSocket(server: http.Server): void {
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust the origin to match your client URL in production
      methods: ['GET', 'POST']
    }
  });

  // Socket.IO connection handler
  io.on('connection', (socket: Socket) => {
    console.log('A client connected: ' + socket.id);

    // Listen for start_session event (triggered by admin)
    socket.on('join_session', (data: { sessionId: string, userId?: string }) => {
      console.log('Session started by admin:', data.sessionId);
      console.log(`User ID: ${data.userId} joining session ${data.sessionId}`); // Debugging line
      console.log(socket.rooms, socket.rooms); // debugging line
      // Have the socket join the room (which creates it if it doesn't exist)
      socket.join(data.sessionId);
      // Notify everyone in the room that the session has started
      io.to(data.sessionId).emit('user_joined', data);
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

    // Example: When a client sends a "custom_event",
    // broadcast it to all other clients in the same room.
    socket.on('custom_event', (data: { sessionId: string; message: string }) => {
      console.log(`Received custom_event from socket ${socket.id} with data:`, data);

      // Use socket.broadcast.to(...) to send to everyone in the room except the sender.
      socket.broadcast.to(data.sessionId).emit('custom_event', data);
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
          io.to(data.sessionId).emit('start_song', { song });
          console.log(`Emitted start_song event to room ${data.sessionId}`);
        } else {
          console.error(`No song found for id: ${data.songId}`);
        }
      } catch (error) {
        console.error("Error in start_song event:", error);
      }
    })

  });
  
}
