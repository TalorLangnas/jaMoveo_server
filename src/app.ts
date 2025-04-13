import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./api/auth/auth.routes.js";
import userRoutes from "./api/user/user.routes.js";
import sessionRoutes from "./api/session/session.routes.js";
import songRoutes from "./api/song/song.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(cors());
app.use(
    cors({
      origin: "https://jamoveo-client.vercel.app", // explicitly allow your client domain
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true, // if you need to support cookies or authorization headers
    })
  );
  
  // Optionally ensure that OPTIONS requests are handled correctly:
  app.options("*", cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    next();
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/song", songRoutes);
app.use(express.static(path.join(__dirname, "public")));

export default app;
