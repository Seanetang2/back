"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
const router = (0, express_1.Router)();
router.route("/create-task/:userID/:projectID").post(taskController_1.createTask);
router.route("/get-tasks/:userID").get(taskController_1.getTasks);
router.route("/get-one-tasks").get(taskController_1.getOneTask);
exports.default = router;
