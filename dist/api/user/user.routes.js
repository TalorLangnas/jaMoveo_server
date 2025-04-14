"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("./user.controller.js");
const router = (0, express_1.Router)();
router.get("/", user_controller_js_1.getUsers);
router.get("/:id", user_controller_js_1.getUser);
exports.default = router;
