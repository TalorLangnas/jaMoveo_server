import mongoose from "mongoose";
import Session, { ISession } from "../../models/session.model.js";
import Song from "../../models/song.model.js";
import User from "../../models/user.model.js";

export const createSession = async (adminId: string) => {
  const session = new Session({ admin: adminId });
  return await session.save();
};

export const joinSession = async (sessionId: string, userId: string) => {
  return await Session.findByIdAndUpdate(
    sessionId,
    { $addToSet: { connectedUsers: userId } }, // avoid duplicates
    { new: true }
  ).populate("activeSong connectedUsers");
};

export const setActiveSong = async (sessionId: string, songId: string) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new Error("Session not found");

  if (session.activeSong) {
    session.songHistory.push(session.activeSong);
  }

  session.activeSong = new mongoose.Types.ObjectId(songId); // ✅ type-safe assignment
  return await session.save();
};

export const quitSession = async (sessionId: string) => {
  return await Session.findByIdAndUpdate(
    sessionId,
    { isActive: false, connectedUsers: [], activeSong: null },
    { new: true }
  );
};

export const getCurrentSession = async (sessionId: string) => {
  return await Session.findById(sessionId)
    .populate("admin", "username")
    .populate("activeSong")
    .populate("connectedUsers", "username instrument")
    .populate("songHistory");
};
