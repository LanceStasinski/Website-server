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
exports.sendMessage = void 0;
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_error_1 = require("./../models/http-error");
dotenv_1.default.config();
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const EMAIL = process.env.EMAIL;
const transporter = nodemailer_1.default.createTransport((0, nodemailer_sendgrid_transport_1.default)({
    auth: {
        api_key: SENDGRID_KEY,
    },
}));
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new http_error_1.HttpError("Please fill out all fields before sending.", 422);
        next(err);
        return err;
    }
    const { firstName, lastName, email, message } = req.body;
    try {
        yield transporter.sendMail({
            to: EMAIL,
            from: EMAIL,
            subject: `Website: New message from ${firstName} ${lastName}.`,
            html: `<p>From ${email}</p><p>${message}</p>`,
        });
    }
    catch (error) {
        console.log(error);
        const err = new http_error_1.HttpError("Could not send message.", 500);
        next(err);
        return err;
    }
    res.status(201).json({ message: "Message recieved" });
});
exports.sendMessage = sendMessage;
