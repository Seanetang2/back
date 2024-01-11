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
exports.getOneTask = exports.getTasks = exports.createTask = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const projectModel_1 = __importDefault(require("../model/projectModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { taskTitle, email, task } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        const { projectID, userID } = req.params;
        const mainUser = yield userModel_1.default.findById(userID);
        const project = yield projectModel_1.default.findById(projectID);
        if (user) {
            project === null || project === void 0 ? void 0 : project.staff.push(user);
        }
        if (project) {
            const tasks = yield taskModel_1.default.create({
                taskTitle,
                task,
                projectName: project.projectName,
            });
            mainUser === null || mainUser === void 0 ? void 0 : mainUser.tasks.push(tasks);
            mainUser === null || mainUser === void 0 ? void 0 : mainUser.save();
            project === null || project === void 0 ? void 0 : project.task.push(tasks);
            (_b = (_a = project === null || project === void 0 ? void 0 : project.myTask) === null || _a === void 0 ? void 0 : _a.todo) === null || _b === void 0 ? void 0 : _b.data.push(task);
            project === null || project === void 0 ? void 0 : project.save();
            const projectTask = yield projectModel_1.default.findByIdAndUpdate(projectID, project, { new: true });
            return res.status(201).json({
                msg: "task created",
                data: projectTask,
            });
        }
        else {
            return res.status(404).json({
                msg: "Failed to find project",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const tasks = yield userModel_1.default.findById(userID).populate({
            path: "tasks",
        });
        return res.status(200).json({
            msg: "Getting tasks",
            data: tasks,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTasks = getTasks;
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskTitle } = req.body;
        const { taskID } = req.params;
        const tasks = yield projectModel_1.default.findById(taskID);
        return res.status(200).json({
            msg: "Getting tasks",
            data: tasks,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneTask = getOneTask;
