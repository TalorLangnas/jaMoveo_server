"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSessionController = exports.disconnectSessionController = exports.joinSessionController = exports.createSessionController = void 0;
const session_service_js_1 = require("./session.service.js");
const user_model_js_1 = __importDefault(require("../../models/user.model.js"));
const session_model_js_1 = __importDefault(require("../../models/session.model.js"));
const createSessionController = async (req, res) => {
    try {
        const adminId = req.user.id;
        const session = await (0, session_service_js_1.createSession)(adminId);
        if (!session) {
            console.log("Admin already has an active session.");
            res.status(400).json({ message: "Session already exists" });
        }
        else {
            res.status(201).json(session);
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createSessionController = createSessionController;
const joinSessionController = async (req, res) => {
    const userId = req.user.id;
    try {
        const session = await session_model_js_1.default.findOne({});
        if (!session) {
            res.status(404).json({ message: "Session not found" });
            return;
        }
        if (!session.connectedUsers.includes(userId)) {
            session.connectedUsers.push(userId);
            await session.save();
            const user = await user_model_js_1.default.findById(userId);
            if (user) {
                user.sessionId = session._id;
                await user.save();
            }
        }
        res.json({ message: "Joined the session successfully!", session });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.joinSessionController = joinSessionController;
const disconnectSessionController = async (req, res) => {
    const userSessionId = req.body.sessionId;
    const userId = req.user.id;
    try {
        const result = await (0, session_service_js_1.disconnectUser)(userSessionId, userId);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.disconnectSessionController = disconnectSessionController;
const getCurrentSessionController = async (req, res) => {
    try {
        const session = await (0, session_service_js_1.getCurrentSession)(req.params.id);
        if (!session) {
            res.status(404).json({ message: "Session not found" });
            return;
        }
        res.json(session);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getCurrentSessionController = getCurrentSessionController;
