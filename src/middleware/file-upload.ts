import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

import HttpError from "../models/http-error";

dotenv.config();
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;

type MimeMap = {
  [key: string]: string;
};

const MIME_TYPE_MAP: MimeMap = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
};

aws.config.update({
  secretAccessKey: AMZ_SECRET_ACCESS_KEY,
  accessKeyId: AMZ_ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AMZ_S3_BUCKET!,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, uuid() + '-' + file.originalname);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
  }),
  fileFilter: function (req, file, cb) {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (!isValid) {
      return cb(new HttpError("Invalid mimetype", 422));
    }
    cb(null, isValid);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
