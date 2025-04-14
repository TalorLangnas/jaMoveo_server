"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_js_1 = __importDefault(require("../../models/user.model.js"));
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const registerUser = async (username, password, instrument, role = "player") => {
    const existingUser = await user_model_js_1.default.findOne({ username });
    if (existingUser)
        throw new Error("Username already exists");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = new user_model_js_1.default({
        username,
        password: hashedPassword,
        instrument,
        role,
    });
    await user.save();
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (username, password) => {
    const user = await user_model_js_1.default.findOne({ username });
    if (!user)
        throw new Error("Invalid username or password");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid username or password");
    // Create the token, include user role along with user id
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return {
        token,
        role: user.role,
        userId: user._id,
        instrument: user.instrument,
    };
};
exports.loginUser = loginUser;
