import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, instrument } = req.body;
    const user = await registerUser(username, password, instrument);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const signupAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, instrument } = req.body;
    const user = await registerUser(username, password, instrument, "admin");
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    } else {
      res.status(401).json({ error: "An unknown error occurred" });
    }
  }
};
