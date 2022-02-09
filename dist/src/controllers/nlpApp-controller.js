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
exports.getNLPData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NLP_KEY = process.env.NLP_KEY;
const getNLPData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newsURL = req.body.url;
    try {
        const response = yield (0, axios_1.default)(`https://api.meaningcloud.com/sentiment-2.1?key=${NLP_KEY}&url=${newsURL}&lang=en`, { method: "POST" });
        const apiData = response.data;
        res.send(apiData);
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.getNLPData = getNLPData;
