import { Request, Response } from "express";
import {
  createSession,
  // joinSession,
  setActiveSong,
  quitSession,
  getCurrentSession
} from "./session.service.js";
import { loadSongs } from "../../services/song.service.js";
import { scrapeSongFromTab4U } from "../../services/songScraper.js"; 

export const createSessionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminId = (req as any).user.id;  // Get admin's user ID from request
    const session = await createSession(adminId);  // Create session and save it to DB
    res.status(201).json(session);  // Return the session object (sessionUrl is already in the session object)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const joinSessionController = async (req: Request, res: Response): Promise<void> => {
  const sessionId = req.params.id; // Get session ID from URL
  const sessionUrl = req.body.sessionUrl; // Player needs to send the session URL when they try to join
  
  try {
    // Fetch the session
    const session = await getCurrentSession(sessionId);
    
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    // Check if the session URL matches the one sent by the admin
    if (session.sessionUrl !== sessionUrl) {
      res.status(400).json({ message: "Invalid session URL" });
      return;
    }

    // Players can join regardless of the active song status, so we don't need to check it.
    // Just add the player to the session's connectedUsers.
    // You can also add any relevant logic like player status, but for now, we just add them.

    // Proceed to add the player to the connected users list (assuming verifyToken checks user authenticity)
    const userId = (req as any).user.id; // Get player’s user ID from the token

    // Add player to the connected users list (avoiding duplicates)
    if (!session.connectedUsers.includes(userId)) {
      session.connectedUsers.push(userId);
      await session.save();
    }

    // Respond with the session data
    res.json({ message: "Joined the session!", session });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const setActiveSongController = async (req: Request, res: Response) => {
  try {
    const { songTitle } = req.body; // Assuming songTitle is passed in the body
    const session = await setActiveSong(req.params.id, songTitle);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const quitSessionController = async (req: Request, res: Response) => {
  try {
    const session = await quitSession(req.params.id);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCurrentSessionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await getCurrentSession(req.params.id);

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

