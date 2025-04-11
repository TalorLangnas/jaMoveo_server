import { Request, Response } from "express";
import {
  createSession,
  getCurrentSession,
  disconnectUser 
} from "./session.service.js";
import User from "../../models/user.model.js";
import Session from "../../models/session.model.js"; 


export const createSessionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminId = (req as any).user.id;  
    const session = await createSession(adminId);
    if (!session) {
      console.log("Admin already has an active session.");
      res.status(400).json({ message: "Session already exists" });
    } else {
      res.status(201).json(session); 
    } 
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const joinSessionController = async (req: Request, res: Response): Promise<void> => {
  console.log("entered joinSessionController"); // Log to check if the function is called
  // const sessionId = req.params.id;
  const userId = (req as any).user.id;
  try {
    // Fetch the session
    const session = await Session.findOne({});
    // const session = await Session.findById(sessionId);
    
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    // Ensure the user is not already in the session's connected users
    if (!session.connectedUsers.includes(userId)) {
      
      session.connectedUsers.push(userId);
      await session.save();

      // Update the user's sessionId field to match the session _id
      const user = await User.findById(userId);
      if (user) {
        user.sessionId = session._id;
        await user.save();
      }
    }

    res.json({ message: "Joined the session successfully!", session });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const disconnectSessionController = async (req: Request, res: Response): Promise<void> => {
  const userSessionId = req.body.sessionId;  // Extract the sessionId from the request body
  const userId = (req as any).user.id;  // Get the user ID from the token

  try {
    // Call the disconnectUser function to handle the logic
    const result = await disconnectUser(userSessionId, userId);

    // Send the result back to the client
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
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

