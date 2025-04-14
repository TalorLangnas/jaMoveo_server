"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// Middleware for verify the user token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
        return;
    }
};
exports.verifyToken = verifyToken;
// Middleware for verifying if the user is an admin
const requireAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        res.status(403).json({ error: "Admin access only" });
        return;
    }
    next();
};
exports.requireAdmin = requireAdmin;
