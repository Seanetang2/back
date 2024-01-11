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
exports.getProjectTask = exports.getOneProject = exports.getProjects = exports.createProject = void 0;
const projectModel_1 = __importDefault(require("../model/projectModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectName, comment } = req.body;
        console.log(projectName);
        const { userID } = req.params;
        const project = yield projectModel_1.default.create({
            projectName,
            comment,
            myTask: {
                todo: {
                    id: "todo",
                    data: [],
                },
                progress: {
                    id: "progress",
                    data: [],
                },
                done: {
                    id: "done",
                    data: [],
                },
            },
        });
        const user = yield userModel_1.default.findById(userID);
        user === null || user === void 0 ? void 0 : user.project.push(new mongoose_1.Types.ObjectId(project._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            msg: "project created",
            data: project,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "project",
        });
        return res.status(201).json({
            msg: "project created",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProjects = getProjects;
const getOneProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const project = yield projectModel_1.default.findById(projectID);
        return res.status(201).json({
            msg: "project created",
            data: project,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneProject = getOneProject;
const getProjectTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const project = yield projectModel_1.default.findById(projectID).populate({
            path: "task",
        });
        return res.status(201).json({
            msg: "project created",
            data: project,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProjectTask = getProjectTask;
