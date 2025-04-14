"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("./auth.controller.js");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_js_1.signup);
router.post("/signup/admin", auth_controller_js_1.signupAdmin);
router.post("/login", auth_controller_js_1.login);
exports.default = router;
