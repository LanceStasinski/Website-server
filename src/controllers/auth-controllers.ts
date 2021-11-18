import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";
import { userModel as User } from "../models/user";
import { adminModel as Admin } from "../models/admin";

dotenv.config();
const JWT_KEY = process.env.JWT_KEY!;
const ADMIN_USER = process.env.ADMIN_USER!;

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
    return next(
      new HttpError("Passwords do not match. Please try again.", 422)
    );
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
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
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
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  res.status(201).json({
    userId: newUser.id,
    username: newUser.username,
    token: token,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER) {
    let admin;
    try {
      admin = await Admin.findOne({ username: username });
    } catch (error) {
      return next(new HttpError("Database error.", 500));
    }
    if (!admin) {
      return next(new HttpError("Admin not found.", 403));
    }
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, admin.password);
    } catch (error) {
      return next(new HttpError("Bcrypt error", 500));
    }

    if (!isValidPassword) {
      return next(new HttpError("Invalid credentials.", 403));
    }

    let token;

    try {
      token = await jwt.sign(
        { userId: admin.id, username: admin.username },
        JWT_KEY,
        {
          expiresIn: "1hr",
        }
      );
    } catch (error) {
      return next(new HttpError("JWT error.", 500));
    }

    res.status(200).json({
      token: token,
      userId: admin.id,
      username: admin.username,
    });
  } else {
    let existingUser;
    try {
      existingUser = await User.findOne({ username: username })
    } catch (error) {
      return next(new HttpError('Login failed. Please try again.', 500))
    }
    if (!existingUser) {
      return next(new HttpError('User not found. Sign up?', 403))
    }
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
      return next(new HttpError('Login failed. Please try again.', 500))
    }
    if (!isValidPassword) {
      return next(new HttpError('Invalid credentials.', 403))
    }
    let token;

    try {
      token = await jwt.sign(
        { userId: existingUser.id, username: existingUser.username },
        JWT_KEY,
        {
          expiresIn: "1hr",
        }
      );
    } catch (error) {
      return next(new HttpError("Login failed. Please try again.", 500));
    }

    res.status(200).json({
      token: token,
      userId: existingUser.id,
      username: existingUser.username,
    });
  }
};
