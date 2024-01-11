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
exports.getStaff = exports.createStaff = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
const staffModel_1 = __importDefault(require("../model/staffModel"));
const createStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffName, avatar } = req.body;
        const { userID } = req.params;
        const staff = yield staffModel_1.default.create({
            staffName,
            avatar,
        });
        const user = yield userModel_1.default.findById(userID);
        user === null || user === void 0 ? void 0 : user.staff.push(new mongoose_1.Types.ObjectId(staff._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            msg: "staff created",
            data: staff,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createStaff = createStaff;
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffName, avatar } = req.body;
        const { userID } = req.params;
        const staff = yield staffModel_1.default.find();
        return res.status(201).json({
            msg: "staff created",
            data: staff,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getStaff = getStaff;
