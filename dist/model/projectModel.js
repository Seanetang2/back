"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectModel = new mongoose_1.Schema({
    projectName: {
        type: String,
    },
    comment: {
        type: String,
    },
    myTask: {
        type: {},
    },
    staff: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "staffs",
        },
    ],
    task: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "tasks",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("projects", projectModel);
