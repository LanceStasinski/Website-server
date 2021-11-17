import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";
import { userModel as User } from "../models/user";

dotenv.config();
const JWT_KEY = process.env.JWT_KEY!;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs. Please try again.", 422));
  }

  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new HttpError('Passwords do not match. Please try again.', 422))
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError(
        "This username already exists, please choose a new one.",
        422
      )
    );
  }

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
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Signing up failed, please try again later.", 500));
  }

  let token;
  try {
    token = await jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
      },
      JWT_KEY,
      {
        expiresIn: "1hr",
      }
    );
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again later.', 500))
  }

  res.status(201).json({
    userId: newUser.id,
    username: newUser.username,
    token: token
  })
};
