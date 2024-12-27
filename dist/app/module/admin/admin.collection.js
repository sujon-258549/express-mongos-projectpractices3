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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const admin_servises_1 = require("./admin.servises");
const send_success_1 = __importDefault(require("../utility/send-success"));
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const findAllAdmin = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_servises_1.adminServises.getAllAdminsFromDB(req.query);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'admin recived Success',
        data: result,
    });
}));
const deleteAllAdmin = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_servises_1.adminServises.deletedAdmin(id);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'admin delete Success',
        data: result,
    });
}));
exports.adminController = {
    findAllAdmin,
    deleteAllAdmin,
};
