import { Request, Response } from "express";
import {
  createSession,
  joinSession,
  setActiveSong,
  quitSession,
  getCurrentSession
} from "./session.service.js";

export const createSessionController = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;
    const session = await createSession(adminId);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const joinSessionController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const session = await joinSession(req.params.id, userId);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
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

