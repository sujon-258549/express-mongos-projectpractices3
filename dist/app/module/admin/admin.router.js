"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_collection_1 = require("./admin.collection");
const router = (0, express_1.Router)();
router.get('/', admin_collection_1.adminController.findAllAdmin);
router.delete('/:id', admin_collection_1.adminController.deleteAllAdmin);
exports.adminRouter = router;
