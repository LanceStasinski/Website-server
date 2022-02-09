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
const axios_1 = __importDefault(require("axios"));
const getImageRoute = (key, locationParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://pixabay.com/api/?key=${key}&q=${locationParameters}&image_type=photo&orientation=horizontal&category=places&safesearch=true&page=1&per_page=3`);
        return response.data;
    }
    catch (error) {
        console.log("error", error);
    }
});
const getImageNotUSA = (name, countryName, key) => __awaiter(void 0, void 0, void 0, function* () {
    let image;
    let imageData = [];
    let locationParameters = `${name}+${countryName}`;
    try {
        const city = yield getImageRoute(key, locationParameters);
        if (!city || city.total == 0) {
            locationParameters = `${countryName}`;
            const country = yield getImageRoute(key, locationParameters);
            if (!country || country.total == 0) {
                const map = yield getImageRoute(key, "map");
                image = map;
            }
            else {
                image = country;
            }
        }
        else {
            image = city;
        }
    }
    catch (error) {
        console.log(error);
    }
    imageData.push(image.hits[0].tags);
    imageData.push(image.hits[0].webformatURL);
    return imageData;
});
const getImageUSA = (name, adminName1, countryName, key) => __awaiter(void 0, void 0, void 0, function* () {
    let locationParameters = `${name}+${adminName1}`;
    let image;
    let imageData = [];
    try {
        const city = yield getImageRoute(key, locationParameters);
        if (city.total === 0) {
            locationParameters = `${adminName1}`;
            const state = yield getImageRoute(key, locationParameters);
            if (state.total === 0 && city.total === 0) {
                locationParameters = `${countryName}`;
                const country = yield getImageRoute(key, locationParameters);
                image = country;
            }
            else {
                image = state;
            }
        }
        else {
            image = city;
        }
    }
    catch (error) {
        console.log(error);
    }
    imageData.push(image.hits[0].tags);
    imageData.push(image.hits[0].webformatURL);
    return imageData;
});
const requestImage = (countryCode, name, countryName, adminName1, key) => __awaiter(void 0, void 0, void 0, function* () {
    let imageArray;
    try {
        if (countryCode == "US") {
            imageArray = yield getImageUSA(name, adminName1, countryName, key);
        }
        else {
            imageArray = yield getImageNotUSA(name, countryName, key);
        }
    }
    catch (error) {
        console.log(error);
    }
    return imageArray;
});
exports.default = requestImage;
