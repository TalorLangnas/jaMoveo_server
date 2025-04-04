import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    activeSong: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
    connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    songHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // 👈 NEW
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});
const Session = mongoose.model("Session", sessionSchema);
export default Session;
