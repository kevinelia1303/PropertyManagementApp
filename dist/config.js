"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_SECRET = exports.CLOUDINARY_NAME = exports.CLOUDINARY_KEY = exports.SECRET_KEY = exports.PORT = exports.SUPABASE_URL = void 0;
require("dotenv/config");
_a = process.env, exports.SUPABASE_URL = _a.SUPABASE_URL, exports.PORT = _a.PORT, exports.SECRET_KEY = _a.SECRET_KEY, exports.CLOUDINARY_KEY = _a.CLOUDINARY_KEY, exports.CLOUDINARY_NAME = _a.CLOUDINARY_NAME, exports.CLOUDINARY_SECRET = _a.CLOUDINARY_SECRET;
