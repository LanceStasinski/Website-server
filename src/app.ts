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
import contactRoutes from "./routes/contact-routes";
import resumeRoutes from "./routes/resume-routes";
import travelAppRoutes from "./routes/travelApp-routes";
import nlpAppRoutes from "./routes/nlpApp-routes";
import weatherJournalRoutes from "./routes/weatherJournal-routes";
import landingPageRoutes from './routes/landing-page-routes';
import socket from "./socket";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;
const PORT = process.env.PORT!;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.static("public"));

// app.use(
//   "/landing-page",
//   express.static(path.resolve(__dirname, "public", "landing-page"))
// );
// app.use(
//   "/my-first-blog",
//   express.static(path.resolve(__dirname, "public", "blog"))
// );
app.use('/landing-page', landingPageRoutes);
app.get('/my-first-blog', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve(__dirname, "./public/blog", "index.html"));
});
app.use(
  "/travel-app",
  express.static(path.join(__dirname, "public", "travel-app"))
);
app.use(
  "/sentiment-analysis-app",
  express.static(path.join(__dirname, "public", "nlp-app"))
);
app.use(
  "/weather-journal-app",
  express.static(path.resolve(__dirname, "./public/weather-journal-app"))
);
app.use(express.static(path.resolve(__dirname, "./public/website")));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/travel-app", travelAppRoutes);
app.use("/api/sentiment-analysis-app", nlpAppRoutes);
app.use("/api/weather-journal-app", weatherJournalRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve(__dirname, "./public/website", "index.html"));
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
