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
exports.getVideo = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const http_error_1 = __importDefault(require("../models/http-error"));
dotenv_1.default.config();
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;
const getVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: AMZ_ACCESS_KEY,
        secretAccessKey: AMZ_SECRET_ACCESS_KEY,
        region: "us-east-1",
    });
    const videoUrl = s3.getSignedUrl("getObject", {
        Bucket: AMZ_S3_BUCKET,
        Key: "blog_demo.mp4",
        Expires: 3600,
    });
    if (!videoUrl) {
        const err = new http_error_1.default("Cannot get resume.", 500);
        next(err);
        return err;
    }
    res.status(200).json({ videoUrl });
});
exports.getVideo = getVideo;
