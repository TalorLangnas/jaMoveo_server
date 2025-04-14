"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const session_controller_js_1 = require("./session.controller.js");
const router = (0, express_1.Router)();
// Admin route
router.post("/", auth_middleware_js_1.verifyToken, auth_middleware_js_1.requireAdmin, session_controller_js_1.createSessionController);
// User routes
router.post("/join", auth_middleware_js_1.verifyToken, session_controller_js_1.joinSessionController);
router.post("/:id/disconnect", auth_middleware_js_1.verifyToken, session_controller_js_1.disconnectSessionController);
exports.default = router;
