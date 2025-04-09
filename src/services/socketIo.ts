// src/services/socketIo.ts
import { Server, Socket } from 'socket.io';
import http from 'http';

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
    socket.on('start_session', (data: { sessionId: string; adminId?: string; song?: any }) => {
      console.log('Session started by admin:', data);
      // Have the socket join the room (which creates it if it doesn't exist)
      socket.join(data.sessionId);
      // Notify everyone in the room that the session has started
      io.to(data.sessionId).emit('session_started', data);
    });
  
    // Listen for join_session event (triggered by players)
    socket.on('join_session', (data: { sessionId: string; userId: string }) => {
      console.log('Client joining session:', data);
      // Join the room for the session
      socket.join(data.sessionId);
      // Optionally notify others in the session about the new joiner
      io.to(data.sessionId).emit('user_joined', { userId: data.userId, socketId: socket.id });
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
  });
}
