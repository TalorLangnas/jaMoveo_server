import express from "express";
import cors from "cors";

import userRoutes from "./routes/auth.routes"; // placeholder

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", userRoutes); // e.g., /api/auth/signup, /api/auth/login

export default app;
