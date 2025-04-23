"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = __importDefault(require("../controllers/news.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//create
router.post("/", news_controller_1.default.CreateNews);
//get all
router.get("/", auth_middleware_1.verifyToken, news_controller_1.default.GetAllNews);
exports.default = router;
