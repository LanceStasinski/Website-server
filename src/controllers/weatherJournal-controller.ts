import { validationResult } from "express-validator";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { weatherEntryModel as Entry } from "./../models/weatherEntry";
import { weatherUserModel as User } from "./../models/weatherUser";
import HttpError from "../models/http-error";

dotenv.config;
const WEATHERMAP_KEY = process.env.WEATHERMAP_KEY;
const JWT_KEY = process.env.JWT_KEY!;

type EntryArray = [
  {
    weather: {
      description: string;
      icon: string;
      temp: number;
      wind: {
        speed: number;
        deg: number;
      };
    };
    location: string;
    subject: string;
    text: string;
    date: {
      month: string;
      day: string;
      year: string;
    };
    _id: any;
  }
];

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
        401
      );
      next(err);
      return err;
    }

    user = existingUser;
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

  if (zipCode === "no zip") {
    const err = new HttpError("Please enter a zip code.", 422);
    next(err);
    return err;
  }

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

export const getEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user;
  try {
    user = await User.findById(req.userId);
  } catch (error) {
    const err = new HttpError("Could not find user. Please try again", 500);
    next(err);
    return err;
  }

  if (!user) {
    const err = new HttpError("Could not find this user.", 404);
    next(err);
    return err;
  }

  const entries = user.entries;

  res.status(200).send({ entries });
};

export const postEntry = async (
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weatherData;
  let location;
  try {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}${WEATHERMAP_KEY}`
    );
    const { weather, main, wind, name } = response.data;
    weatherData = {
      description: weather[0].description,
      icon: weather[0].icon,
      temp: main.temp,
      wind: {
        speed: wind.speed,
        deg: wind.deg,
      },
    };
    location = name;
  } catch (error) {
    const err = new HttpError(
      "Issue getting weather data. Please check your zip code setting and try again.",
      500
    );
    next(err);
    return err;
  }

  const date = new Date();
  const month = months[date.getMonth()];
  const day = date.getDate().toString();
  const year = date.getFullYear().toString();

  const dateInfo = {
    month,
    day,
    year,
  };

  const entry = {
    weather: weatherData,
    location,
    subject: req.body.subject,
    text: req.body.message,
    date: dateInfo,
  };

  let user: any;
  try {
    user = await User.findById(req.userId);
  } catch (error) {
    const err = new HttpError("Could not find user. Please try again.", 500);
    next(err);
    return err;
  }

  if (!user) {
    const err = new HttpError("Could not find user.", 404);
    next(err);
    return err;
  }

  let newEntry;
  try {
    user.entries.push(entry);
    await user.save();
    newEntry = user.entries.pop();
  } catch (error) {
    const err = new HttpError("Could not save entry. Please try again.", 500);
    next(err);
    return err;
  }

  if (!newEntry) {
    const err = new HttpError("Could not save entry. Please try again.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ newEntry });
};

export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("No post to delete.", 422);
    next(err);
    return err;
  }

  try {
    await User.updateOne(
      { _id: req.userId },
      { $pull: { entries: { _id: req.body.id } } }
    );
  } catch (error) {
    const err = new HttpError("Could not delete entry. Please try again.", 500);
    next(err);
    return err;
  }

  res.status(200).send({ id: req.body.id });
};

export const updateEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("Invalid input. Please try again.", 422);
    next(err);
    return err;
  }
  const entryId = req.params.entryId;

  let user;
  try {
    await User.findOneAndUpdate(
      {
        _id: req.userId,
        entries: { $elemMatch: { _id: entryId } },
      },
      {
        $set: {
          "entries.$.subject": req.body.subject,
          "entries.$.text": req.body.message,
        },
      }
    );
  } catch (error) {
    const err = new HttpError("Could not save changes. Please try again.", 500);
    next(err);
    return err;
  }

  let updatedEntry;
  try {
    const entry = await User.findOne(
      { _id: req.userId },
      { entries: { $elemMatch: { _id: entryId } } }
    );
    updatedEntry = entry?.entries[0];
  } catch (error) {
    const err = new HttpError("Could not get updated entry.", 500);
    next(err);
    return err;
  }

  res.status(200).send({ updatedEntry });
};
