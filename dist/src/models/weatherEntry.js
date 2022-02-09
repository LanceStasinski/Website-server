"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherEntryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const weatherEntrySchema = new mongoose_1.Schema({
    weather: {
        description: { type: String, required: true },
        icon: { type: String, required: true },
        temp: { type: Number, required: true },
        wind: {
            speed: { type: Number, required: true },
            deg: { type: Number, required: true }
        }
    },
    location: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    date: {
        month: { type: String, required: true },
        day: { type: String, required: true },
        year: { type: String, required: true },
    },
    creatorId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "WeatherUser",
    },
});
exports.weatherEntryModel = (0, mongoose_1.model)("WeatherEntry", weatherEntrySchema);
