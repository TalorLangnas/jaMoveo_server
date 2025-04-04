import Session from "../../models/session.model.js";
export const createSession = async (adminId) => {
    const session = new Session({ admin: adminId });
    return await session.save();
};
export const joinSession = async (sessionId, userId) => {
    return await Session.findByIdAndUpdate(sessionId, { $addToSet: { connectedUsers: userId } }, // avoid duplicates
    { new: true }).populate("activeSong connectedUsers");
};
export const setActiveSong = async (sessionId, songId) => {
    const session = await Session.findById(sessionId);
    if (!session)
        throw new Error("Session not found");
    // Push to history if there's an active song
    if (session.activeSong) {
        session.songHistory.push(session.activeSong);
    }
    session.activeSong = songId;
    return await session.save();
};
export const quitSession = async (sessionId) => {
    return await Session.findByIdAndUpdate(sessionId, { isActive: false, connectedUsers: [], activeSong: null }, { new: true });
};
export const getCurrentSession = async (sessionId) => {
    return await Session.findById(sessionId)
        .populate("admin", "username")
        .populate("activeSong")
        .populate("connectedUsers", "username instrument")
        .populate("songHistory");
};
