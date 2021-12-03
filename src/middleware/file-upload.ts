// import { dotenv } from 'dotenv';
// import multer from "multer";
// import { v4 as uuid } from "uuid";
// import HttpError from "../models/http-error";

// type MimeMap = {
//   [key: string]: string;
// };

// const MIME_TYPE_MAP: MimeMap = {
//   "image/png": "png",
//   "image/jpg": "jpg",
//   "image/jpeg": "jpeg",
//   "image/gif": "gif",
// };

// const fileUpload = multer({
//   limits: {
//     fileSize: 5000000,
//   },
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images");
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE_MAP[file.mimetype];
//       cb(null, uuid() + "." + ext);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype]
//     if (!isValid) {
//       return cb(new HttpError('Invalid mimetype', 422))
//     }
//     cb(null, isValid)
//   }
// });

// export default fileUpload;

import aws from 'aws-sdk';
import multer from 'multer'
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;

aws.config.update({
  secretAccessKey: AMZ_SECRET_ACCESS_KEY,
  accessKeyId: AMZ_ACCESS_KEY,
  region: 'us-east-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'stasinski-website-media',
    key: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString())
    }
  })
})

export default upload;