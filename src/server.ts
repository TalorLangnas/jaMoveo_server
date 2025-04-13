import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./services/socket.js";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    initSocket(server);
  });
});

export default server;
