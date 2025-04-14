"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
const user_service_js_1 = require("./user.service.js");
const getUsers = async (_req, res) => {
    try {
        const users = await (0, user_service_js_1.getAllUsers)();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const user = await (0, user_service_js_1.getUserById)(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUser = getUser;
