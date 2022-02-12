"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_error_1 = __importDefault(require("../models/http-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const auth = (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new http_error_1.default("Authentication failed.", 401);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_KEY);
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        return next(new http_error_1.default("Authentication failed.", 401));
    }
};
exports.auth = auth;
