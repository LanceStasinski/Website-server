import fs from 'fs';

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import HttpError from './models/http-error';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;
const PORT = process.env.PORT!;

const app = express();

app.use(bodyParser.json());

app.use(cors()); //use CORS packages to setup CORS

// Manually set CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"),
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred." });
});


mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 8080);
    console.log('connects to mongoDB')
  })
  .catch((err) => {
    console.log(err);
  });