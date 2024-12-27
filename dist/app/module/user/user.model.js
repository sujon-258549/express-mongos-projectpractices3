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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMainModel = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// Define the User Schema
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needChangePassword: {
        type: Boolean,
        required: true,
        default: true,
    },
    passwordChangeAt: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'faculty', 'student'],
            message: '{VALUE} is not a valid role',
        },
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-progress', 'blocked'],
            message: '{VALUE} , is not define',
        },
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
// // middleware use for mongoose
userSchema.pre('save', function name(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcript_has));
        console.log(this, 'student create prosasing');
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    console.log(this, 'Student Create is Success');
    next();
});
userSchema.statics.isUserExistsByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UserMainModel.findOne({ id }).select('+password');
    });
};
userSchema.statics.isPasswordMatch = function (password, hasPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, hasPassword);
    });
};
userSchema.statics.isStatus = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const finddata = yield exports.UserMainModel.findOne({ id });
        return (finddata === null || finddata === void 0 ? void 0 : finddata.status) === 'blocked';
    });
};
userSchema.statics.isDeleteUser = function (id, isDeleted) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UserMainModel.findOne({ id, isDeleted });
    });
};
// Export the User Model
exports.UserMainModel = mongoose_1.default.model('User', userSchema);
