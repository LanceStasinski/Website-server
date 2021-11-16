import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";

dotenv.config();
const JWT_KEY = process.env.JWT_KEY;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs. Please try again.", 422));
  }

  const {username, password, confirmPassword } = req.body;

  let existingUser;
  // try {
  //   existingUser = await
  // }
};
