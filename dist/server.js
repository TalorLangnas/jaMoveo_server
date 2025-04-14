"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
const socket_js_1 = require("./services/socket.js");
dotenv_1.default.config();
const server = http_1.default.createServer(app_js_1.default);
const PORT = process.env.PORT || 5000;
(0, db_js_1.default)().then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        (0, socket_js_1.initSocket)(server);
    });
});
exports.default = server;
