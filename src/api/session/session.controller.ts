import { Request, Response } from "express";
import {
  createSession,
  // joinSession,
  setActiveSong,
  quitSession,
  getCurrentSession
} from "./session.service.js";
import User from "../../models/user.model.js";
import { verifyToken } from "../../middlewares/auth.middleware.js"; 


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
  const sessionUrl = req.body.sessionUrl; // The session URL provided by the player
  const sessionId = req.params.id; // The session ID from the URL (this should match the session URL)
  const userId = (req as any).user.id; // Get user ID from the token

  try {
    // Fetch the session based on the session ID
    const session = await getCurrentSession(sessionId);
    
    // Check if the session exists and is active
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    if (!session.isActive) {
      res.status(400).json({ message: "Session is no longer active" });
      return;
    }

    // If the session URL doesn't match, return an error
    if (session.sessionUrl !== sessionUrl) {
      res.status(400).json({ message: "Invalid session URL" });
      return;
    }

    // Check if the user is signed up (verify if the user exists)
    const user = await User.findById(userId); // Assuming the user is authenticated by token
    if (!user) {
      // If the user is not found, return an error and suggest going to the signup page
      res.status(401).json({ message: "User not signed up. Please sign up to join." });
      return;
    }

    // Add the user to the session (if not already in the session)
    if (!session.connectedUsers.includes(userId)) {
      session.connectedUsers.push(userId);
      await session.save(); // Save the session with the new connected user
    }

    // Respond with the session data and user details to navigate to the main page
    res.json({
      message: "Joined the session successfully!",
      session,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        instrument: user.instrument,
      },
    });
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

