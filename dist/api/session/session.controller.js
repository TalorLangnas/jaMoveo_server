import { createSession, joinSession, setActiveSong, quitSession, getCurrentSession } from "./session.service.js";
export const createSessionController = async (req, res) => {
    try {
        const adminId = req.user.id;
        const session = await createSession(adminId);
        res.status(201).json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const joinSessionController = async (req, res) => {
    try {
        const userId = req.user.id;
        const session = await joinSession(req.params.id, userId);
        res.json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const setActiveSongController = async (req, res) => {
    try {
        const { songId } = req.body;
        const session = await setActiveSong(req.params.id, songId);
        res.json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const quitSessionController = async (req, res) => {
    try {
        const session = await quitSession(req.params.id);
        res.json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getCurrentSessionController = async (req, res) => {
    try {
        const session = await getCurrentSession(req.params.id);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        res.json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
