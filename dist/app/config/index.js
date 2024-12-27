"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URO,
    bcript_has: process.env.BCRYPC_HAS,
    defult_passwoed: process.env.DEFULT_PASSWORD,
    ACCESS_secret_kye: process.env.JWT_ACCESS_TOCEN,
    JWT_REFRES_TOCEN: process.env.JWT_REFRES_TOCEN,
    JWT_EXPIRE_IN_ACCESSTOKEN: process.env.JWT_EXPIRE_IN_ACCESSTOKEN,
    JWT_EXPIRE_IN_REFRESS: process.env.JWT_EXPIRE_IN_REFRESS,
};
