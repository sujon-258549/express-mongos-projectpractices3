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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const globalErrorhandaler_1 = __importDefault(require("./app/madelware/globalErrorhandaler"));
const notfound_1 = __importDefault(require("./app/madelware/notfound"));
const route_1 = __importDefault(require("./app/route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: 'http://localhost:5001' }));
app.use('/api/v1', route_1.default);
// error handel
app.use(globalErrorhandaler_1.default);
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = 10;
    res.send(a);
    Promise.reject();
});
app.use('/', test);
//not found
app.use(notfound_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
