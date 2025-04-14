"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectUser = exports.getCurrentSession = exports.createSession = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const session_model_js_1 = __importDefault(require("../../models/session.model.js"));
const user_model_js_1 = __importDefault(require("../../models/user.model.js"));
const createSession = async (adminId) => {
    const existingSession = await session_model_js_1.default.findOne({
        admin: adminId,
        isActive: true,
    });
    if (existingSession) {
        return null;
    }
    const isLocal = process.env.NODE_ENV === "development";
    const baseUrl = isLocal ? "http://localhost:5000" : process.env.BASE_URL;
    const session = new session_model_js_1.default({
        admin: adminId,
    });
    await session.save();
    session.sessionUrl = `${baseUrl}/api/session/${session._id.toString()}`;
    await session.save();
    const admin = await user_model_js_1.default.findById(adminId);
    if (admin) {
        admin.sessionId = session._id;
        await admin.save();
    }
    return session;
};
exports.createSession = createSession;
const getCurrentSession = async (sessionId) => {
    return await session_model_js_1.default.findById(sessionId)
        .populate("admin", "username")
        .populate("connectedUsers", "username instrument")
        .exec();
};
exports.getCurrentSession = getCurrentSession;
const disconnectUser = async (userSessionId, userId) => {
    const session = await session_model_js_1.default.findById(userSessionId);
    if (!session)
        throw new Error("Session not found");
    const user = await user_model_js_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    // Handle player disconnection
    if (user.role === "player") {
        if (!session.connectedUsers.includes(userObjectId))
            throw new Error("User is not in the session");
        // Remove player from the connectedUsers and update session
        session.connectedUsers = session.connectedUsers.filter((id) => !id.equals(userObjectId));
        await session.save();
        user.sessionId = 0;
        await user.save();
        return {
            message: "Player successfully disconnected from the session",
            session,
        };
    }
    // Handle admin disconnection
    if (user.role === "admin") {
        session.isActive = false;
        await session.save();
        // Remove all players from the connectedUsers list and reset their sessionId
        for (const connectedUserId of session.connectedUsers) {
            const connectedUser = await user_model_js_1.default.findById(connectedUserId);
            if (connectedUser) {
                connectedUser.sessionId = 0;
                await connectedUser.save();
            }
        }
        await session.deleteOne();
        user.sessionId = 0;
        await user.save();
        return {
            message: "Admin successfully disconnected. Session is finished.",
            session,
        };
    }
    throw new Error("Invalid user role");
};
exports.disconnectUser = disconnectUser;
