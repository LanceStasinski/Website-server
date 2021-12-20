import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";

import { HttpError } from "./../models/http-error";

dotenv.config();
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const EMAIL = process.env.EMAIL;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_KEY,
    },
  })
);

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError(
      "Please fill out all fields before sending.",
      422
    );
    next(err);
    return err;
  }

  const { firstName, lastName, email, message } = req.body;

  try {
    await transporter.sendMail({
      to: EMAIL,
      from: EMAIL,
      subject: `Website: New message from ${firstName} ${lastName}.`,
      html: `<p>From ${email}</p><p>${message}</p>`,
    });
  } catch (error) {
    console.log(error)
    const err = new HttpError("Could not send message.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ message: "Message recieved" });
};
