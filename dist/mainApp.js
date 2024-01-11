"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const projectRouter_1 = __importDefault(require("./router/projectRouter"));
const taskRouter_1 = __importDefault(require("./router/taskRouter"));
const staffRouter_1 = __importDefault(require("./router/staffRouter"));
const mainApp = (app) => {
    try {
        app.use("/api/v2", userRouter_1.default);
        app.use("/api/v2", projectRouter_1.default);
        app.use("/api/v2", taskRouter_1.default);
        app.use("/api/v2", staffRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    msg: "Welcome to my API",
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainApp = mainApp;
