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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const cloudinary_1 = __importDefault(require("../connectors/cloudinary"));
const isErrorWithMessage = (error) => {
    return (typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string");
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, address } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Avatar file is required" });
        }
        const result = yield cloudinary_1.default.uploader.upload(file.path);
        const user = new userModel_1.default({ name, age, avatarUrl: result.secure_url, address });
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        if (isErrorWithMessage(err)) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const users = yield userModel_1.default.find().skip(skip).limit(limit);
        const total = yield userModel_1.default.countDocuments();
        res.status(200).json({
            page,
            limit,
            total,
            users,
        });
    }
    catch (err) {
        if (isErrorWithMessage(err)) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (err) {
        if (isErrorWithMessage(err)) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, address } = req.body;
        const file = req.file;
        let avatarUrl = req.body.avatarUrl;
        if (file) {
            const result = yield cloudinary_1.default.uploader.upload(file.path);
            avatarUrl = result.secure_url;
        }
        const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, { name, age, avatarUrl, address }, { new: true });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (err) {
        if (isErrorWithMessage(err)) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        if (isErrorWithMessage(err)) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.deleteUser = deleteUser;
