import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import dotenv from "dotenv";
import aws from "aws-sdk";

import HttpError from "../models/http-error";
import { commentModel as Comment } from "../models/comment";
import { userModel as User } from "../models/user";
import { adminModel as Admin } from "../models/admin";
import { postModel as Post } from "../models/post";

dotenv.config();
const ADMIN_ID = process.env.ADMIN_ID;
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError("Title and/or blurb missing.", 422);
    next(err);
    return err;
  }

  if (req.userId !== ADMIN_ID) {
    const err = new HttpError("Invalid credentials.", 403);
    next(err);
    return err;
  }

  interface ImageData {
    key: string;
    bucket: string;
  }

  interface ContentObj {
    type: "paragraph" | "image" | "imageUrl" | "code" | "heading";
    text?: string;
    alt?: string;
    language?: string;
    image?: ImageData;
  }

  interface RefObj {
    authors: string;
    date: string;
    title: string;
    url: string;
  }

  const { title, blurb, month, day, year, numContent, numReferences } =
    req.body;

  const content: ContentObj[] = [];
  const reqKeys = Object.keys(req.body);
  const filesArr: any | Express.Multer.File[] = req.files;

  for (let i = 1; i <= Number(numContent); i++) {
    const contentObj: ContentObj = <ContentObj>{};
    const regex = new RegExp(i.toString());
    const imgData = <ImageData>{};
    for (const key of reqKeys) {
      if (regex.test(key)) {
        if (/types/.test(key)) {
          contentObj.type = req.body[key];
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

    for (const file of filesArr) {
      if (regex.test(file.fieldname)) {
        imgData.key = file.key;
        imgData.bucket = file.bucket;
      }
    }
    contentObj.image = imgData;

    if (contentObj.type === "image" || contentObj.type === "imageUrl") {
      if (contentObj.alt === "") {
        const err = new HttpError("Alternative text needed.", 422);
        next(err);
        return err;
      }
    }

    if (
      contentObj.type === "code" ||
      contentObj.type === "heading" ||
      contentObj.type === "paragraph" ||
      contentObj.type === "imageUrl"
    ) {
      if (contentObj.text === "") {
        const err = new HttpError("Text content missing.", 422);
        next(err);
        return err;
      }
    }

    if (contentObj.type === "code" && contentObj.language === "") {
      const err = new HttpError("Code language missing.", 422);
      next(err);
      return err;
    }

    if (contentObj.type === "image" && Object.keys(imgData).length === 0) {
      const err = new HttpError("Image specified but not provided.", 422);
      next(err);
      return err;
    }

    if (Object.keys(contentObj).length > 0) {
      content.push(contentObj);
    }
  }

  const references: RefObj[] = [];
  for (let i = 1; i <= Number(numReferences); i++) {
    const refObj: RefObj = <RefObj>{};
    const regex = new RegExp(i.toString());
    for (const key of reqKeys) {
      if (regex.test(key)) {
        if (/authors/.test(key)) {
          refObj.authors = req.body[key];
        }
        if (/date/.test(key)) {
          refObj.date = req.body[key];
        }
        if (/title/.test(key)) {
          refObj.title = req.body[key];
        }
        if (/url/.test(key)) {
          refObj.url = req.body[key];
        }
      }
    }
    if (Object.keys(refObj).length > 0) {
      references.push(refObj);
    }
  }

  const createdPost = new Post({
    title,
    blurb,
    month,
    day,
    year,
    content,
    references,
    admin: req.userId,
  });

  let admin;
  try {
    admin = await Admin.findById(req.userId);
  } catch (error) {
    const err = new HttpError("Database error.", 500);
    next(err);
    return err;
  }

  if (!admin) {
    const err = new HttpError("Could not find admin for provided ID", 404);
    next(err);
    return err;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    admin.posts.push(createdPost);
    await admin.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Could not save post.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ message: "Data recieved" });
};

export const getPostHeaders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let posts;
  try {
    posts = await Post.find(
      {},
      { title: 1, blurb: 1, month: 1, day: 1, year: 1 }
    );
  } catch (error) {
    const err = new HttpError(
      "Could not get posts, please try again later.",
      500
    );
    next(err);
    return err;
  }

  if (!posts) {
    const err = new HttpError("Posts not found.", 404);
    next(err);
    return err;
  }

  res.status(200).json({ posts });
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  let post;
  try {
    post = await Post.findById(postId, "-admin").populate("comments");
  } catch (error) {
    const err = new HttpError(
      "Could not get post, please try again later.",
      500
    );
    next(err);
    return err;
  }

  if (!post) {
    const err = new HttpError("Posts not found.", 404);
    next(err);
    return err;
  }

  post.content.map((content) => {
    if (content.type === "image") {
      const s3 = new aws.S3({
        accessKeyId: AMZ_ACCESS_KEY,
        secretAccessKey: AMZ_SECRET_ACCESS_KEY,
        region: "us-east-1",
      });
      const url = s3.getSignedUrl("getObject", {
        Bucket: content.image!.bucket,
        Key: content.image!.key,
        Expires: 60,
      });

      if (!url) {
        const err = new HttpError("Cannot get image.", 500);
        next(err);
        return err;
      }
      content.text = url;
    }
  });
  res.status(200).json({ post });
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
      422
    );
    next(err);
    return err;
  }

  const createdComment = new Comment({
    creatorId: userId,
    comment: newComment,
    postId,
    username: user.username,
  });

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    const err = new HttpError(
      "Adding comment failed, please try again later.",
      500
    );
    next(err);
    return err;
  }

  if (!post) {
    const err = new HttpError(
      "Cannot add a comment to a post that does not exist.",
      422
    );
    next(err);
    return err;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdComment.save({ session: sess });
    user.comments!.push(createdComment);
    post.comments!.push(createdComment);
    await user.save({ session: sess });
    await post.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Could not save comment.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ createdComment });
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.commentId;

  let comment;
  try {
    comment = await Comment.findById(commentId)
      .populate("creatorId")
      .populate("postId");
  } catch (error) {
    const err = new HttpError("Cannot delete comment.", 500);
    next(err);
    return err;
  }

  if (!comment) {
    const err = new HttpError("Cannot find comment to delete", 404);
    next(err);
    return err;
  }

  if (comment.creatorId._id.toString() !== req.userId) {
    const err = new HttpError(
      "You are not allowed to delete this comment",
      401
    );
    next(err);
    return err;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await comment.remove({ session: sess });
    comment.creatorId.comments.pull(comment);
    comment.postId.comments.pull(comment);
    await comment.creatorId.save({ session: sess });
    await comment.postId.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Cannot delete comment.", 500);
    next(err);
    return err;
  }

  res.status(200).json({message: 'Comment deleted.'});
};
