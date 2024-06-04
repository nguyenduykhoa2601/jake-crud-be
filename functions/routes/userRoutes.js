"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/users', upload.single('avatar'), userController_1.createUser);
router.get('/users', userController_1.getUsers);
router.get('/users/:id', userController_1.getUser);
router.put('/users/:id', upload.single('avatar'), userController_1.updateUser);
router.delete('/users/:id', userController_1.deleteUser);
exports.default = router;
