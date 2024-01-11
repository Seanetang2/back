"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskModel = new mongoose_1.Schema({
    taskTitle: { type: String },
    projectName: { type: String },
    task: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("tasks", taskModel);
