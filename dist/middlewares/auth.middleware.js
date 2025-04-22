"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.adminManagerGuard = adminManagerGuard;
exports.adminGuard = adminGuard;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const error_middleware_1 = require("./error.middleware");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            console.log(token);
            if (!token) {
                throw new error_middleware_1.HttpException(500, "Unauthorized");
            }
            if (token) {
                const verifyUser = (0, jsonwebtoken_1.verify)(token, config_1.SECRET_KEY);
                if (!verifyUser) {
                    throw new error_middleware_1.HttpException(500, "Unauthorized");
                    // throw new Error("Unauthorized")
                }
                //   console.log(verifyUser)
                req.user = verifyUser;
                next();
            }
            else {
                throw new Error("Unauthorized");
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function adminManagerGuard(roles) {
    return function adminGuard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
                    throw new error_middleware_1.HttpException(500, "Admin Only");
                    // throw new Error("Admin only")
                }
                next();
            }
            catch (error) {
                next(error);
            }
        });
    };
}
function adminGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
                throw new error_middleware_1.HttpException(500, "Admin Only");
                // throw new Error("Admin only")
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
