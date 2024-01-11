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
exports.getOneUser = exports.signinUser = exports.verifyUser = exports.upgradePremo = exports.upgradeBremo = exports.createPremoUser = exports.createBremoUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const rand = crypto_1.default.randomBytes(3).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            vToken: rand,
        });
        return res.status(201).json({
            msg: "User created",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const createBremoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const rand = crypto_1.default.randomBytes(3).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            vToken: rand,
            plan: "bremo",
        });
        return res.status(201).json({
            msg: "User created",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createBremoUser = createBremoUser;
const createPremoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const rand = crypto_1.default.randomBytes(3).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            vToken: rand,
            plan: "premo",
        });
        return res.status(201).json({
            msg: "User created",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPremoUser = createPremoUser;
const upgradeBremo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            yield userModel_1.default.findByIdAndUpdate(user.id, {
                plan: "bremo",
            }, { new: true });
        }
        return res.status(201).json({
            msg: "User updated to bremo",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.upgradeBremo = upgradeBremo;
const upgradePremo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const update = yield userModel_1.default.findByIdAndUpdate(user.id, {
                plan: "premo",
            }, { new: true });
            return res.status(201).json({
                msg: "User upgraded to premo",
                data: update,
            });
        }
        else {
            return res.status(404).json({
                msg: "User does not exist",
                data: user,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.upgradePremo = upgradePremo;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, vToken } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user && vToken === user.vToken) {
            yield userModel_1.default.findByIdAndUpdate(user._id, {
                vToken: "",
                verified: true,
            }, { new: true });
            return res.status(201).json({
                msg: "User created",
                data: user,
            });
        }
        else {
            return res.status(404).json({
                msg: "Error verifying user",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyUser = verifyUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield userModel_1.default.findOne({ email });
        if (findUser) {
            const compare = yield bcrypt_1.default.compare(password, findUser.password);
            if (compare) {
                if (findUser.verified && findUser.vToken === "") {
                    const encryptedID = jsonwebtoken_1.default.sign({ id: findUser._id }, "justForMe");
                    return res.status(200).json({
                        msg: "Data gotten",
                        data: encryptedID,
                    });
                }
                else {
                    return res.status(404).json({
                        msg: "Verify your account",
                    });
                }
            }
            else {
                return res.status(404).json({
                    msg: "Check your password",
                });
            }
        }
        else {
            return res.status(404).json({
                msg: "Check your email",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.signinUser = signinUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            return res.status(200).json({
                msg: "User found",
                data: user,
            });
        }
        else {
            return res.status(404).json({
                msg: "User does not exist",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "Error",
        });
    }
});
exports.getOneUser = getOneUser;
