import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { weatherEntryModel as Entry } from "./../models/weatherEntry";
import { weatherUserModel as User } from "./../models/weatherUser";

dotenv.config;
const WEATHERMAP_KEY = process.env.WEATHERMAP_KEY;
const JWT_KEY = process.env.JWT_KEY!;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  let user;
  let entries;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    const newUser = new User({
      username,
    });
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
    entries = [];
    user = newUser;
  } else {
    try {
      entries = await Entry.find({ creatorId: existingUser.id });
      user = existingUser;
    } catch (error) {
      console.log(error);
    }
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: user?.id,
      },
      JWT_KEY,
      { expiresIn: "2hr" }
    );
  } catch (error) {
    console.log(error);
  }
  res.status(201).json({userId: user?.id, entries})
};

export const postEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let weather;
  try {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}${WEATHERMAP_KEY}`
    );
    weather = response.data;
  } catch (error) {
    console.log(error);
  }

  let user: any;
  try {
    user = await User.findById(req.userId);
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    console.log("No user found");
  }

  const entryData = {
    date: new Date().toDateString(),
    temp: weather.main.temp,
    weather: weather.weather[0].main,
    feelings: req.body.feelings,
    creatorId: req.userId,
  };

  const entry = new Entry(entryData);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await entry.save({ session: sess });
    user?.entries.push(entry);
    await user!.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ entryData });
};
