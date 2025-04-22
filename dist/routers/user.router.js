"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//register
router.post("/register", user_controller_1.default.Register);
//login
router.post("/login", user_controller_1.default.Login);
//refresh token
router.get("/refresh", auth_middleware_1.verifyToken, user_controller_1.default.RefreshToken);
exports.default = router;
