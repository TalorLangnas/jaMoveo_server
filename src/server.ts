import dotenv from "dotenv";                         
import http from "http";
import app from "./app.js";                       // ✅ use .js extensions in ESM
import { connectDB } from "./config/db.js";
import { initSocket } from "./config/socket.js";

dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
});
