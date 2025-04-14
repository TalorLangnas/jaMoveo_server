"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_routes_js_1 = __importDefault(require("./api/auth/auth.routes.js"));
const user_routes_js_1 = __importDefault(require("./api/user/user.routes.js"));
const session_routes_js_1 = __importDefault(require("./api/session/session.routes.js"));
const song_routes_js_1 = __importDefault(require("./api/song/song.routes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const staticPath = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticPath));
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/users", user_routes_js_1.default);
app.use("/api/session", session_routes_js_1.default);
app.use("/api/song", song_routes_js_1.default);
app.get('/**', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
exports.default = app;
