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
exports.login = exports.signUp = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("../models/http-error"));
const user_1 = require("../models/user");
const admin_1 = require("../models/admin");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const ADMIN_USER = process.env.ADMIN_USER;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.default("Invalid inputs. Please try again.", 422));
    }
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return next(new http_error_1.default("Passwords do not match. Please try again.", 422));
    }
    let existingUser;
    try {
        existingUser = yield user_1.userModel.findOne({ username: username });
    }
    catch (error) {
        return next(new http_error_1.default("Signing up failed, please try again later.", 500));
    }
    if (existingUser) {
        return next(new http_error_1.default("This username already exists, please choose a new one.", 422));
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    }
    catch (error) {
        return next(new http_error_1.default("Signing up failed, please try again later.", 500));
    }
    const newUser = new user_1.userModel({
        username,
        password: hashedPassword,
    });
    try {
        yield newUser.save();
    }
    catch (error) {
        return next(new http_error_1.default("Signing up failed, please try again later.", 500));
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({
            userId: newUser.id,
            username: newUser.username,
        }, JWT_KEY, {
            expiresIn: "2hr",
        });
    }
    catch (error) {
        return next(new http_error_1.default("Signing up failed, please try again later.", 500));
    }
    res.status(201).json({
        userId: newUser.id,
        username: newUser.username,
        token: token,
    });
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === ADMIN_USER) {
        let admin;
        try {
            admin = yield admin_1.adminModel.findOne({ username: username });
        }
        catch (error) {
            return next(new http_error_1.default("Database error.", 500));
        }
        if (!admin) {
            return next(new http_error_1.default("Admin not found.", 403));
        }
        let isValidPassword = false;
        try {
            isValidPassword = yield bcryptjs_1.default.compare(password, admin.password);
        }
        catch (error) {
            return next(new http_error_1.default("Bcrypt error", 500));
        }
        if (!isValidPassword) {
            return next(new http_error_1.default("Invalid credentials.", 403));
        }
        let token;
        try {
            token = jsonwebtoken_1.default.sign({ userId: admin.id, username: admin.username }, JWT_KEY, {
                expiresIn: "2hr",
            });
        }
        catch (error) {
            return next(new http_error_1.default("JWT error.", 500));
        }
        res.status(200).json({
            token: token,
            userId: admin.id,
            username: admin.username,
        });
        return;
    }
    else {
        let existingUser;
        try {
            existingUser = yield user_1.userModel.findOne({ username: username });
        }
        catch (error) {
            const err = new http_error_1.default("Login failed. Please try again.", 500);
            next(err);
            return err;
        }
        if (!existingUser) {
            const err = new http_error_1.default("User not found. Sign up?", 403);
            next(err);
            return err;
        }
        let isValidPassword = false;
        try {
            isValidPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
        }
        catch (error) {
            const err = new http_error_1.default("Login failed. Please try again.", 500);
            next(err);
            return err;
        }
        if (!isValidPassword) {
            const err = new http_error_1.default("Invalid credentials.", 403);
            next(err);
            return err;
        }
        let token;
        try {
            token = jsonwebtoken_1.default.sign({ userId: existingUser.id, username: existingUser.username }, JWT_KEY, {
                expiresIn: "2hr",
            });
        }
        catch (error) {
            const err = new http_error_1.default("Login failed. Please try again.", 500);
            next(err);
            return err;
        }
        return res.status(200).json({
            token: token,
            userId: existingUser.id,
            username: existingUser.username,
        });
    }
});
exports.login = login;
