import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import dotenv from "dotenv";
import aws from "aws-sdk";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

import HttpError from "../models/http-error";
import { commentModel as Comment } from "../models/comment";
import { userModel as User } from "../models/user";
import { adminModel as Admin } from "../models/admin";
import { postModel as Post } from "../models/post";
import socket from "../socket";

dotenv.config();
const ADMIN_ID = process.env.ADMIN_ID;
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const EMAIL = process.env.EMAIL;
const CLIENT_URL = process.env.CLIENT_URL;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_KEY,
    },
  })
);

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userId !== ADMIN_ID) {
    const err = new HttpError("Invalid credentials.", 401);
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

  if (title === "" || blurb === "") {
    const err = new HttpError("Title and/or blurb missing.", 422);
    next(err);
    return err;
  }

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

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;

  if (req.userId !== ADMIN_ID) {
    const err = new HttpError("Invalid credentials.", 401);
    next(err);
    return err;
  }

  let post;
  try {
    post = await Post.findById(postId).populate("admin").populate("comments");
  } catch (error) {
    const err = new HttpError("MongoDB error getting post.", 500);
    next(err);
    return err;
  }

  if (!post) {
    const err = new HttpError("Could not find post to delete.", 404);
    next(err);
    return err;
  }

  const images = post.content.filter((item) => item.type === "image");
  if (images.length > 0) {
    aws.config.update({
      secretAccessKey: AMZ_SECRET_ACCESS_KEY,
      accessKeyId: AMZ_ACCESS_KEY,
      region: "us-east-1",
    });
    const s3 = new aws.S3();

    interface Image {
      key: string;
      bucket: string;
    }

    const deleteImage = async (image: Image) => {
      const params = {
        Bucket: image.bucket,
        Key: image.key,
      };
      try {
        await s3.deleteObject(params).promise();
      } catch (error) {
        const err = new HttpError("Could not delete image on S3.", 500);
        next(err);
        return err;
      }
    };

    images.forEach((item) => {
      deleteImage(item.image! as Image);
    });
  }

  const deleteCommentHandler = async (comment: any) => {
    let com;
    try {
      com = await Comment.findById(comment._id).populate("creatorId");
    } catch (error) {
      const err = new HttpError("Cannot delete comment.", 500);
      next(err);
      return err;
    }

    if (!com) {
      const err = new HttpError("Cannot find comment to delete", 404);
      next(err);
      return err;
    }

    try {
      const sess2 = await mongoose.startSession();
      sess2.startTransaction();
      await com.remove({ session: sess2 });
      com.creatorId.comments.pull(comment);
      await com.creatorId.save({ session: sess2 });
      await sess2.commitTransaction();
    } catch (error) {
      const err = new HttpError("Cannot delete comment.", 500);
      next(err);
      return err;
    }
  };

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.admin.posts.pull(post);
    post.comments?.forEach((comment) => {
      deleteCommentHandler(comment);
    });
    await post.admin.save();
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError("Cannot delete post.", 500);
    next(err);
    return err;
  }

  res.status(200).json({ message: "Post deleted." });
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

  const { newComment, postId, date } = req.body;
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
    date,
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

  socket.getIO().emit("comments", {
    action: "create",
    comment: createdComment,
  });

  try {
    await transporter.sendMail({
      to: EMAIL,
      from: EMAIL,
      subject: `Someone added a comment to your blog.`,
      html: `<h1>${user.username} added a comment to the "${
        post.title
      }" post.</h1>
    <p>Comment: ${createdComment.comment}</p>
    <a href="${CLIENT_URL}/blog/${post._id.toString()}">View the comment</a>`,
    });
  } catch (error) {
    console.log(error);
    const err = new HttpError("Could not add comment.", 500);
    next(err);
    return err;
  }

  res.status(201).json({ message: "Comment added" });
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
    const err = new HttpError("Cannot delete comment.", 500);
    next(err);
    return err;
  }

  socket.getIO().emit("comments", { action: "delete", commentId: comment._id });

  res.status(200).json({ message: "Comment deleted." });
};
