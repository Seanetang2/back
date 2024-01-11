"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    userName: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    plan: { type: String, default: "freemo" },
    vToken: { type: String },
    verified: { type: Boolean, default: false },
    project: [{ type: mongoose_1.Types.ObjectId, ref: "projects" }],
    staff: [{ type: mongoose_1.Types.ObjectId, ref: "staffs" }],
    tasks: [{ type: mongoose_1.Types.ObjectId, ref: "tasks" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
