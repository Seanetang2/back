"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffController_1 = require("../controller/staffController");
const router = (0, express_1.Router)();
router.route("/create-staff/:projectID").post(staffController_1.createStaff);
exports.default = router;
