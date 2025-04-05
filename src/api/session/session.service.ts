import mongoose from "mongoose";
import Session, { ISession } from "../../models/session.model.js";
import { loadSongs } from "../../services/song.service.js";
import User from "../../models/user.model.js";

export const createSession = async (adminId: string): Promise<ISession> => {
  const isLocal = process.env.NODE_ENV === "development";  // Check if in development
  const baseUrl = isLocal ? "http://localhost:5000" : process.env.BASE_URL; // Use environment variable for production URL

  // Create a new session first (so Mongoose generates _id)
  const session = new Session({
    admin: adminId,
  });

  await session.save(); // Save the session to the database, Mongoose will generate _id

  // Now that the session is saved, use session._id to generate sessionUrl
  session.sessionUrl = `${baseUrl}/session/${session._id.toString()}`;

  // Save the session again after assigning the sessionUrl
  await session.save();

  return session;  // Return the session object with sessionUrl included (correctly generated)
};

export const setActiveSong = async (sessionId: string, songTitle: string) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new Error("Session not found");

  // Load the songs from the local files
  const songs = await loadSongs();

  // Find the song by title
  const song = songs.find(song => song.title.toLowerCase() === songTitle.toLowerCase());

  if (!song) throw new Error("Song not found");

  // If there's an active song, add it to the song history
  if (session.activeSong) {
    session.songHistory.push(session.activeSong);
  }

  // Set the active song
  session.activeSong = song; // Store the song object itself
  return await session.save();
};

export const getCurrentSession = async (sessionId: string): Promise<ISession | null> => {
  return await Session.findById(sessionId) // No need to populate songs
    .populate("admin", "username")  // Populating admin's username
    .populate("connectedUsers", "username instrument")  // Populating connected user details
    .exec();  // Explicitly call .exec() for more control over the query
};

export const quitSession = async (sessionId: string) => {
  return await Session.findByIdAndUpdate(
    sessionId,
    { isActive: false, connectedUsers: [], activeSong: null },
    { new: true }
  );
};

// export const getCurrentSession = async (sessionId: string) => {
//   return await Session.findById(sessionId)
//     .populate("admin", "username")
//     .populate("activeSong")
//     .populate("connectedUsers", "username instrument")
//     .populate("songHistory");
// };
