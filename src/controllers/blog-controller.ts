import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";
import { commentModel as Comment } from "../models/comment";
import { userModel as User } from "../models/user";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { title, blurb, month, day, year, numContent, numReferences } =
      req.body;

    const content: any = [];

    interface ContentObj {
      types: string;
      text?: string;
      alt?: string;
      language?: string;
    }

    const reqKeys = Object.keys(req.body);
    for (let i = 1; i <= Number(numContent); i++) {
      const contentObj: ContentObj = <ContentObj>{};
      const regex = new RegExp(i.toString());
      for (const key of reqKeys) {
        if (regex.test(key)) {
          if (/types/.test(key)) {
            contentObj.types = req.body[key];
          }
          if (/text/.test(key)) {
            contentObj.text = req.body[key];
          }
          if (/alt/.test(key)) {
            contentObj.alt = req.body[key];
          }
          if (/language/.test(key)) {
            contentObj.language = req.body[key];
          }
        }
      }
      if (Object.keys(contentObj).length > 0) {
        content.push(contentObj);
      }
    }

    const post = {
      title,
      blurb,
      month,
      day,
      year,
      content,
    };
    console.log(post);
  } catch (error) {
    console.log(error);
    const err = new HttpError("Issue recieving data", 500);
    next(err);
    return err;
  }

  res.status(201).json({ message: "Data recieved" });
};

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("Please enter a comment before submitting.", 422);
    next(err);
    return err;
  }

  const { newComment, postId } = req.body;
  const userId = req.userId;

  const createdComment = new Comment({
    creator: userId,
    comment: newComment,
    postId,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    const err = new HttpError(
      "Adding comment failed, please try again later.",
      500
    );
    next(err);
    return err;
  }

  if (!user) {
    const err = new HttpError(
      "This user does not exist. Please login again.",
      500
    );
    next(err);
    return err;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdComment.save({ session: sess });
    user.comments.push(createdComment);
    //Need to also push to blogId
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError("Could not save comment.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ message: "Comment created" });
};
