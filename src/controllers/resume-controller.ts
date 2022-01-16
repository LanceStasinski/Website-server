import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import aws from "aws-sdk";

import HttpError from "../models/http-error";

dotenv.config();
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;

export const getResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const s3 = new aws.S3({
    accessKeyId: AMZ_ACCESS_KEY,
    secretAccessKey: AMZ_SECRET_ACCESS_KEY,
    region: "us-east-1",
  });
  const pdfUrl = s3.getSignedUrl("getObject", {
    Bucket: AMZ_S3_BUCKET,
    Key: "Stasinski-resume.pdf",
    Expires: 3600,
  });

  if (!pdfUrl) {
    const err = new HttpError("Cannot get resume.", 500);
    next(err);
    return err;
  }

  res.status(200).json({ pdfUrl });
};
