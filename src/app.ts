import fs from "fs";
import path from "path";

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import HttpError from "./models/http-error";
import authRoutes from "./routes/auth-routes";
import blogRoutes from "./routes/blog-routes";
import socket from "./socket";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;
const PORT = process.env.PORT!;

const app = express();

app.use(bodyParser.json());

// app.use("/uploads/images", express.static(path.join("upload", "images")));
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

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

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
    const server = app.listen(PORT || 8080);
    const io = socket.init(server);
    io.on("connection", (sock: any) => {
      console.log("client connected");
    });
    console.log("connects to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
