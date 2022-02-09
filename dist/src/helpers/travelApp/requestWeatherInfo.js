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
exports.requestWeatherForecast = exports.requestWeatherCurrent = void 0;
const axios_1 = __importDefault(require("axios"));
const getWeatherRoute = (lat, lng, key, forecastType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.weatherbit.io/v2.0/${forecastType}?lat=${lat}&lon=${lng}&units=I&key=${key}`);
        return response.data;
    }
    catch (error) {
        console.log("error", error);
    }
});
const requestWeatherCurrent = (lat, lng, key) => __awaiter(void 0, void 0, void 0, function* () {
    const forecastType = "current";
    try {
        const currentForcast = yield getWeatherRoute(lat, lng, key, forecastType);
        const { datetime, temp, weather } = currentForcast.data[0];
        const day = {
            date: datetime,
            temp,
            sky: weather.description,
            icon: weather.icon,
        };
        return day;
    }
    catch (error) {
        console.log(error);
    }
});
exports.requestWeatherCurrent = requestWeatherCurrent;
const requestWeatherForecast = (lat, lng, key) => __awaiter(void 0, void 0, void 0, function* () {
    let tripWeather = [];
    const forecastType = "forecast/daily";
    try {
        const weather = yield getWeatherRoute(lat, lng, key, forecastType);
        const weatherData = weather.data;
        for (const data of weatherData) {
            const day = {
                date: data.datetime,
                temp: data.temp,
                sky: data.weather.description,
                icon: data.weather.icon,
            };
            tripWeather.push(day);
        }
    }
    catch (error) {
        console.log(error);
    }
    return tripWeather;
});
exports.requestWeatherForecast = requestWeatherForecast;
