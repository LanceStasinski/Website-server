import { validationResult } from "express-validator";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { weatherEntryModel as Entry } from "./../models/weatherEntry";
import { weatherUserModel as User } from "./../models/weatherUser";
import HttpError from "../models/http-error";

dotenv.config;
const WEATHERMAP_KEY = process.env.WEATHERMAP_KEY;
const JWT_KEY = process.env.JWT_KEY!;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("Invalid inputs. Please try again.", 422);
    next(err);
    return err;
  }

  const { username, password } = req.body;
  let user;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (error) {
    const err = new HttpError("Error getting user data.", 500);
    next(err);
    return err;
  }

  if (!existingUser) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      return next(
        new HttpError("Signing up failed, please try again later.", 500)
      );
    }
    const newUser = new User({
      username,
      password: hashedPassword,
      unitPreference: "imperial",
      zipCode: "no zip",
    });
    try {
      await newUser.save();
      user = newUser;
    } catch (error) {
      const err = new HttpError("Error adding user.", 500);
      next(err);
      return err;
    }
  } else {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      const err = new HttpError("Validation error. Please try again.", 500);
      next(err);
      return err;
    }

    if (!isValidPassword) {
      const err = new HttpError(
        "Incorrect password. Please try again or create a new profile.",
        403
      );
      next(err);
      return err;
    }

    user = existingUser;
    // try {
    //   entries = await Entry.find({ creatorId: existingUser.id });
    //   user = existingUser;
    // } catch (error) {
    //   const err = new HttpError("Error getting entries.", 500);
    //   next(err);
    //   return err;
    // }
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
    const err = new HttpError("Error setting permissions.", 500);
    next(err);
    return err;
  }
  res.status(200).json({
    userId: user?.id,
    token,
    username,
    unitPreference: user.unitPreference,
    zipCode: user.zipCode,
  });
};

export const updatePreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("Invalid inputs. Please try again.", 422);
    next(err);
    return err;
  }

  const { unitPreference, zipCode } = req.body;

  let user;
  try {
    user = await User.findById(req.userId);
  } catch (error) {
    const err = new HttpError("Database error. Please try again.", 500);
    next(err);
    return err;
  }

  if (!user) {
    const err = new HttpError("Could not find user.", 400);
    next(err);
    return err;
  }

  user.zipCode = zipCode;
  user.unitPreference = unitPreference;

  try {
    await user.save();
  } catch (error) {
    const err = new HttpError("Could not save preferences.", 500);
    next(err);
    return err;
  }

  res.status(200).send({ zipCode, unitPreference });
};

export const postEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let weatherData;
  try {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}${WEATHERMAP_KEY}`
    );
    console.log(response.data);
    const { weather, main, wind, name } = response.data;
  } catch (error) {
    const err = new HttpError(
      "Issue getting weather data. Pleae try again.",
      500
    );
    next(err);
    return err;
  }

  // let user: any;
  // try {
  //   user = await User.findById(req.userId);
  // } catch (error) {
  //   console.log(error);
  // }

  // if (!user) {
  //   console.log("No user found");
  // }

  // const entryData = {
  //   date: new Date().toDateString(),
  //   temp: weather.main.temp,
  //   weather: weather.weather[0].main,
  //   feelings: req.body.feelings,
  //   creatorId: req.userId,
  // };

  // const entry = new Entry(entryData);

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await entry.save({ session: sess });
  //   user?.entries.push(entry);
  //   await user!.save({ session: sess });
  //   await sess.commitTransaction();
  // } catch (error) {
  //   console.log(error);
  // }

  res.status(201).json({ message: "ok" });
};
