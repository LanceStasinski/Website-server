import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

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

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 8080);
    console.log('connects to mongoDB')
  })
  .catch((err) => {
    console.log(err);
  });
