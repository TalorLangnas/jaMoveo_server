"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signupAdmin = exports.signup = void 0;
const auth_service_js_1 = require("./auth.service.js");
const signup = async (req, res) => {
    try {
        const { username, password, instrument } = req.body;
        const user = await (0, auth_service_js_1.registerUser)(username, password, instrument);
        res.status(201).json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
};
exports.signup = signup;
const signupAdmin = async (req, res) => {
    try {
        const { username, password, instrument } = req.body;
        const user = await (0, auth_service_js_1.registerUser)(username, password, instrument, "admin");
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.signupAdmin = signupAdmin;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, role, userId, instrument } = await (0, auth_service_js_1.loginUser)(username, password);
        res.status(200).json({ token, role, userId, instrument });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ error: err.message });
        }
        else {
            res.status(401).json({ error: "An unknown error occurred" });
        }
    }
};
exports.login = login;
