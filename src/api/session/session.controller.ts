import { Request, Response } from "express";
import {
  createSession,
  // joinSession,
  setActiveSong,
  quitSession,
  getCurrentSession
} from "./session.service.js";

export const createSessionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminId = (req as any).user.id;
    const session = await createSession(adminId);
    res.status(201).json({ session, sessionUrl: session.sessionUrl });
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

    // If no session exists, return an error
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    // Check if the session URL matches the one sent by the admin
    if (session.sessionUrl !== sessionUrl) {
      res.status(400).json({ message: "Invalid session URL" });
      return;
    }

    // Proceed if the player is authenticated (via verifyToken middleware)
    res.json({ message: "Joined the session!", session });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const setActiveSongController = async (req: Request, res: Response) => {
  try {
    const { songId } = req.body;
    const session = await setActiveSong(req.params.id, songId);
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

