import express from "express";
import cors from "cors";

import authRoutes from "./api/auth/auth.routes.js";
import userRoutes from "./api/user/user.routes.js";
import sessionRoutes from "./api/session/session.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);

export default app;
