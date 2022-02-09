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
exports.postEntry = exports.getEntries = exports.updatePreferences = exports.login = void 0;
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const weatherUser_1 = require("./../models/weatherUser");
const http_error_1 = __importDefault(require("../models/http-error"));
dotenv_1.default.config;
const WEATHERMAP_KEY = process.env.WEATHERMAP_KEY;
const JWT_KEY = process.env.JWT_KEY;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new http_error_1.default("Invalid inputs. Please try again.", 422);
        next(err);
        return err;
    }
    const { username, password } = req.body;
    let user;
    let existingUser;
    try {
        existingUser = yield weatherUser_1.weatherUserModel.findOne({ username: username });
    }
    catch (error) {
        const err = new http_error_1.default("Error getting user data.", 500);
        next(err);
        return err;
    }
    if (!existingUser) {
        let hashedPassword;
        try {
            hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        }
        catch (error) {
            return next(new http_error_1.default("Signing up failed, please try again later.", 500));
        }
        const newUser = new weatherUser_1.weatherUserModel({
            username,
            password: hashedPassword,
            unitPreference: "imperial",
            zipCode: "no zip",
        });
        try {
            yield newUser.save();
            user = newUser;
        }
        catch (error) {
            const err = new http_error_1.default("Error adding user.", 500);
            next(err);
            return err;
        }
    }
    else {
        let isValidPassword = false;
        try {
            isValidPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
        }
        catch (error) {
            const err = new http_error_1.default("Validation error. Please try again.", 500);
            next(err);
            return err;
        }
        if (!isValidPassword) {
            const err = new http_error_1.default("Incorrect password. Please try again or create a new profile.", 403);
            next(err);
            return err;
        }
        user = existingUser;
        // try {
        //   entries = await Entry.find({ creatorId: existingUser.id });
        //   user = existingUser;
        // } catch (error) {
        //   const err = new HttpError("Error getting entries.", 500);
        //   next(err);
        //   return err;
        // }
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({
            userId: user === null || user === void 0 ? void 0 : user.id,
        }, JWT_KEY, { expiresIn: "2hr" });
    }
    catch (error) {
        const err = new http_error_1.default("Error setting permissions.", 500);
        next(err);
        return err;
    }
    res.status(200).json({
        userId: user === null || user === void 0 ? void 0 : user.id,
        token,
        username,
        unitPreference: user.unitPreference,
        zipCode: user.zipCode,
    });
});
exports.login = login;
const updatePreferences = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new http_error_1.default("Invalid inputs. Please try again.", 422);
        next(err);
        return err;
    }
    const { unitPreference, zipCode } = req.body;
    let user;
    try {
        user = yield weatherUser_1.weatherUserModel.findById(req.userId);
    }
    catch (error) {
        const err = new http_error_1.default("Database error. Please try again.", 500);
        next(err);
        return err;
    }
    if (!user) {
        const err = new http_error_1.default("Could not find user.", 400);
        next(err);
        return err;
    }
    user.zipCode = zipCode;
    user.unitPreference = unitPreference;
    try {
        yield user.save();
    }
    catch (error) {
        const err = new http_error_1.default("Could not save preferences.", 500);
        next(err);
        return err;
    }
    res.status(200).send({ zipCode, unitPreference });
});
exports.updatePreferences = updatePreferences;
const getEntries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield weatherUser_1.weatherUserModel.findById(req.userId);
    }
    catch (error) {
        const err = new http_error_1.default("Could not find user. Please try again", 500);
        next(err);
        return err;
    }
    if (!user) {
        const err = new http_error_1.default("Could not find this user.", 404);
        next(err);
        return err;
    }
    const entries = user.entries;
    res.status(200).send({ entries });
});
exports.getEntries = getEntries;
const postEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let weatherData;
    let location;
    try {
        const response = yield (0, axios_1.default)(`http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}${WEATHERMAP_KEY}`);
        const { weather, main, wind, name } = response.data;
        weatherData = {
            description: weather[0].description,
            icon: weather[0].icon,
            temp: main.temp,
            wind: {
                speed: wind.speed,
                deg: wind.deg,
            },
        };
        location = name;
    }
    catch (error) {
        const err = new http_error_1.default("Issue getting weather data. Pleae try again.", 500);
        next(err);
        return err;
    }
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();
    const dateInfo = {
        month,
        day,
        year,
    };
    const entry = {
        weather: weatherData,
        location,
        subject: req.body.subject,
        text: req.body.message,
        date: dateInfo,
    };
    let user;
    try {
        user = yield weatherUser_1.weatherUserModel.findById(req.userId);
    }
    catch (error) {
        const err = new http_error_1.default("Could not find user. Please try again.", 500);
        next(err);
        return err;
    }
    if (!user) {
        const err = new http_error_1.default("Could not find user.", 404);
        next(err);
        return err;
    }
    try {
        user.entries.push(entry);
        yield user.save();
    }
    catch (error) {
        const err = new http_error_1.default("Could not save entry. Please try again.", 500);
        next(err);
        return err;
    }
    res.status(201).json({ message: "OK" });
});
exports.postEntry = postEntry;
