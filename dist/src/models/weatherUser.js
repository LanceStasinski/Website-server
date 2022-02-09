"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherUserModel = void 0;
const mongoose_1 = require("mongoose");
const weatherUserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    entries: [
        {
            weather: {
                description: { type: String, required: true },
                icon: { type: String, required: true },
                temp: { type: Number, required: true },
                wind: {
                    speed: { type: Number, required: true },
                    deg: { type: Number, required: true },
                },
            },
            location: { type: String, required: true },
            subject: { type: String, required: true },
            text: { type: String, required: true },
            date: {
                month: { type: String, required: true },
                day: { type: String, required: true },
                year: { type: String, required: true },
            },
        },
    ],
    unitPreference: { type: String, required: true },
    zipCode: { type: String, required: true },
});
exports.weatherUserModel = (0, mongoose_1.model)("WeatherUser", weatherUserSchema);
