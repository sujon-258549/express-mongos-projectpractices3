"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acadimicDepertmentRouter = void 0;
const express_1 = require("express");
const acadimic_Depertment_controllers_1 = require("./acadimic.Depertment.controllers");
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const acadimicDepertment_validaction_1 = require("./acadimicDepertment.validaction");
const router = (0, express_1.Router)();
router.post('/create-depertment', (0, zod_validaction_1.default)(acadimicDepertment_validaction_1.acadimicDepertment.createAcadimicDepentmetnValidactionZod), acadimic_Depertment_controllers_1.acadimicDepertmentContruller.createDepertment);
router.get('/', acadimic_Depertment_controllers_1.acadimicDepertmentContruller.findAllFaculty);
router.get('/:depertmentId', acadimic_Depertment_controllers_1.acadimicDepertmentContruller.findSingleFaculty);
router.delete('/:depertmentId', acadimic_Depertment_controllers_1.acadimicDepertmentContruller.deleteSingleFaculty);
router.patch('/:depertmentId', (0, zod_validaction_1.default)(acadimicDepertment_validaction_1.acadimicDepertment.updateAcadimicDepentmetnValidactionZod), acadimic_Depertment_controllers_1.acadimicDepertmentContruller.updateSingleDepertment);
exports.acadimicDepertmentRouter = router;
