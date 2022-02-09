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
exports.updateTripData = exports.postTripData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const requestGeoInfo_1 = __importDefault(require("../helpers/travelApp/requestGeoInfo"));
const requestWeatherInfo_1 = require("../helpers/travelApp/requestWeatherInfo");
const requestImage_1 = __importDefault(require("../helpers/travelApp/requestImage"));
const requestCountryInfo_1 = __importDefault(require("../helpers/travelApp/requestCountryInfo"));
const updateWeather_1 = require("./../helpers/travelApp/updateWeather");
dotenv_1.default.config();
const GEOUSER = process.env.GEO_USERNAME;
const IMAGE_KEY = process.env.PIXABAY_KEY;
const WEATHER_KEY = process.env.WEATHER_KEY;
const postTripData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { destination, arrival, departure, daysAway, tripNum } = req.body;
    let trip = {};
    try {
        const coords = yield (0, requestGeoInfo_1.default)(destination, GEOUSER);
        const { totalResultsCount, geonames } = coords;
        const { lat, lng, countryCode, name, countryName, adminName1 } = geonames[0];
        if (totalResultsCount === 0) {
            trip = {
                message: "Location not recognized",
            };
        }
        else {
            const currentWeather = yield (0, requestWeatherInfo_1.requestWeatherCurrent)(lat, lng, WEATHER_KEY);
            const forecastWeather = yield (0, requestWeatherInfo_1.requestWeatherForecast)(lat, lng, WEATHER_KEY);
            const image = yield (0, requestImage_1.default)(countryCode, name, countryName, adminName1, IMAGE_KEY);
            const countryInfo = yield (0, requestCountryInfo_1.default)(countryCode);
            trip = {
                message: "OK",
                arrival,
                departure,
                daysAway,
                destination,
                current: currentWeather,
                forecast: forecastWeather,
                imageURL: image[1],
                imageTag: image[0],
                countryName: countryInfo[0].name.official,
                capital: countryInfo[0].capital[0],
                currency: countryInfo[0].currencies[Object.keys(countryInfo[0].currencies)[0]]
                    .name,
                flag: countryInfo[0].flags.png,
                language: countryInfo[0].languages[Object.keys(countryInfo[0].languages)[0]],
                region: countryInfo[0].subregion,
                tripNum,
                lat,
                lng,
            };
        }
    }
    catch (error) {
        console.log(error);
    }
    res.send(trip);
});
exports.postTripData = postTripData;
const updateTripData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng } = req.body;
    let trip;
    try {
        const current = yield (0, updateWeather_1.updateWeatherCurrent)(lat, lng, WEATHER_KEY);
        const forecast = yield (0, updateWeather_1.updateWeatherForecast)(lat, lng, WEATHER_KEY);
        trip = {
            current,
            forecast,
        };
    }
    catch (error) {
        console.log(error);
    }
    res.send(trip);
});
exports.updateTripData = updateTripData;
