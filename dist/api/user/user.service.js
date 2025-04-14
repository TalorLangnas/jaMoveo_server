"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = void 0;
const user_model_js_1 = __importDefault(require("../../models/user.model.js"));
const getAllUsers = async () => {
    return await user_model_js_1.default.find();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await user_model_js_1.default.findById(id);
};
exports.getUserById = getUserById;
