"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const http_error_1 = __importDefault(require("../models/http-error"));
dotenv_1.default.config();
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/gif": "gif",
};
aws_sdk_1.default.config.update({
    secretAccessKey: AMZ_SECRET_ACCESS_KEY,
    accessKeyId: AMZ_ACCESS_KEY,
    region: "us-east-1",
});
const s3 = new aws_sdk_1.default.S3();
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: AMZ_S3_BUCKET,
        key: function (req, file, cb) {
            const fileName = (0, uuid_1.v4)() + "-" + file.originalname;
            cb(null, fileName);
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
    }),
    fileFilter: function (req, file, cb) {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        if (!isValid) {
            return cb(new http_error_1.default("Invalid mimetype", 422));
        }
        cb(null, isValid);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
exports.default = upload;
