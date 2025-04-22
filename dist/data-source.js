"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PMADB = void 0;
const typeorm_1 = require("typeorm"); // config koneksi ke db
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
exports.PMADB = new typeorm_1.DataSource({
    type: "postgres",
    url: config_1.SUPABASE_URL || "",
    synchronize: false, //khusus development, kalo production false
    logging: true, // log apapun yg terjadi di db
    entities: [path_1.default.join(__dirname, "/entities/*.{js,ts}")], // models
    migrations: [path_1.default.join(__dirname, "/migrations/*.{js,ts}")], // penambahan apa pada tabel, satu tabel satu migration
    // username: "postgres",
    // password: "postgres",
    // host: "localhost",
    // port:3306
    // database: "kevdb",
}); // bisa multiple koneksi dbnya caranya sama
