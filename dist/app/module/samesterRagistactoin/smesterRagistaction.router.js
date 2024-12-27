"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const smesterRagistaction_controllers_1 = require("./smesterRagistaction.controllers");
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const samesterRagistaction_zodValidaction_1 = require("./samesterRagistaction.zodValidaction");
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, zod_validaction_1.default)(samesterRagistaction_zodValidaction_1.SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), smesterRagistaction_controllers_1.SemesterRegistrationController.createRagistaction);
router.get('/', smesterRagistaction_controllers_1.SemesterRegistrationController.findAllRagistaction);
router.patch('/:id', (0, zod_validaction_1.default)(samesterRagistaction_zodValidaction_1.SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema), smesterRagistaction_controllers_1.SemesterRegistrationController.updateStatus);
router.get('/:id', smesterRagistaction_controllers_1.SemesterRegistrationController.findoneRagistaction);
// router.delete(
//   '/:id',
//   SemesterRegistrationController.deleteSemesterRegistration,
// );
// router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);
exports.semesterRegistrationRoutes = router;
