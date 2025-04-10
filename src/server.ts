// src/server.ts
import dotenv from "dotenv";
import http from "http";
import app from "./app.js"; // Ensure you're using .js for ESM if necessary
import { connectDB } from "./config/db.js";
import { initSocket } from "./services/socket.js"; // Import the initSocket function

dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    // Initialize Socket.IO once the server is listening
    initSocket(server);
  });
});

export default server; // Export the server for testing or other purposes
