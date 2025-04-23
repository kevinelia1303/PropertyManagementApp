"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const UserService = {
    findOneByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield data_source_1.PMADB.getRepository(user_entity_1.User)
                .createQueryBuilder("user")
                .where("user.email = :email", { email })
                .getOne();
        }
        catch (error) {
            throw error;
        }
    }),
    register: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, name }) {
        let avatar = "";
        try {
            const user = yield UserService.findOneByEmail(email);
            if (user) {
                // throw new HttpException (500, "User with that email already exist")
            }
            // if (file) {
            //   const { secure_url } = await cloudinaryUpload(file)
            //   avatar = secure_url
            //   // avatar = file.filename
            // }
            const salt = yield (0, bcrypt_1.genSalt)(10); // membuat sudo random number
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            console.log(hashPassword);
            yield data_source_1.PMADB.createQueryBuilder()
                .insert()
                .into(user_entity_1.User)
                .values({ email, password: hashPassword, name, avatar })
                .execute();
            // const templatePath = path.join(
            //   __dirname,
            //   "../templates",
            //   "registration-template.hbs"
            // )
            // const templateSource = fs.readFileSync(templatePath, "utf-8")
            // const compiledTemplate = handlebars.compile(templateSource)
            // const html = compiledTemplate({name}) // untuk masukin nama ke template
            // await transporter.sendMail({
            //   from: "Sender Address",
            //   to: email,
            //   subject: "Register",
            //   html: "<h1>Thank you</h1>",
            // })
        }
        catch (error) {
            // await cloudinaryRemove(avatar)
            throw error;
        }
    }),
    login: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
        try {
            const user = yield UserService.findOneByEmail(email);
            //   if (!user) {
            //     // throw new HttpException (500, "Email incorrect")
            //   }
            if (!user) {
                throw new Error("Email incorrect");
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                // throw new HttpException (500, "Password is incorrect")
            }
            const payload = {
                uuid: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            };
            const access_token = (0, jsonwebtoken_1.sign)(payload, config_1.SECRET_KEY, {
                expiresIn: "2h",
            }); // untuk refresh session token (taro di cookies)
            const session_token = (0, jsonwebtoken_1.sign)(payload, config_1.SECRET_KEY, {
                expiresIn: "1h",
            });
            return {
                access_token,
                session_token,
                user: payload,
            };
        }
        catch (error) {
            throw error;
        }
    }),
    refreshToken: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserService.findOneByEmail(email);
            //   if (!user) {
            //     // throw new HttpException (500, "Email incorrect")
            //   }
            if (!user) {
                throw new Error("Something went wrong");
            }
            const payload = {
                email: user.email,
                name: user.name,
                role: user.role,
            };
            const access_token = (0, jsonwebtoken_1.sign)(payload, config_1.SECRET_KEY, {
                expiresIn: "1h",
            }); // untuk refresh session token (taro di cookies)
            const session_token = (0, jsonwebtoken_1.sign)(payload, config_1.SECRET_KEY, {
                expiresIn: "5m",
            });
            return {
                access_token,
                session_token,
                user: payload,
            };
        }
        catch (error) {
            throw error;
        }
    }),
};
exports.default = UserService;
