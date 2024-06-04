"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    avatarUrl: { type: String, required: true },
    address: { type: String, required: true }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
