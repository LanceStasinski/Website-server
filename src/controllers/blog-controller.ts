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
import parseContent from "../helpers/parseContent";
import parseReferences from "../helpers/parseReferences";

dotenv.config();
const ADMIN_ID = process.env.ADMIN_ID;
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const EMAIL = process.env.EMAIL;
const CLIENT_URL = process.env.CLIENT_URL;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_KEY,
    },
  })
);

export interface ImageData {
  key?: string;
  bucket?: string;
}

export interface ContentObj {
  type: "paragraph" | "image" | "imageUrl" | "code" | "heading";
  text?: string;
  alt?: string;
  language?: string;
  image?: ImageData;
}

export interface RefObj {
  authors: string;
  date: string;
  title: string;
  url: string;
}

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
  const { title, blurb, month, day, year, numContent, numReferences } =
    req.body;

  if (title === "" || blurb === "") {
    const err = new HttpError("Title and/or blurb missing.", 422);
    next(err);
    return err;
  }

  const reqKeys = Object.keys(req.body);
  const filesArr: any | Express.Multer.File[] = req.files;

  const content = parseContent(numContent, reqKeys, filesArr, req.body, next);
  const references = parseReferences(numReferences, reqKeys, req.body);

  const createdPost = new Post({
    title,
    blurb,
    month,
    day,
    year,
    content,
    references,
    admin: req.userId,
    updatedDay: "",
    updatedMonth: "",
    updatedYear: "",
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

  let posts;
  try {
    posts = await Post.find(
      {},
      { title: 1, _id: 1 }
    );
  } catch (error) {
    const err = new HttpError('Cannot load post. Please try again.', 500);
    next(err);
    return err;
  }

  res.status(200).json({ post, posts });
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

export const updatePost = async (
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
  const { title, blurb, day, month, year, numContent, numReferences } =
    req.body;

  if (title === "" || blurb === "") {
    const err = new HttpError("Title and/or blurb missing.", 422);
    next(err);
    return err;
  }

  const reqKeys = Object.keys(req.body);
  const filesArr: any | Express.Multer.File[] = req.files;

  const content = parseContent(numContent, reqKeys, filesArr, req.body, next);
  const references = parseReferences(numReferences, reqKeys, req.body);

  let postToUpdate;
  try {
    postToUpdate = await Post.findById(postId);
  } catch (error) {
    const err = new HttpError("MongoDB error finding post.", 500);
    next(err);
    return err;
  }

  if (!postToUpdate) {
    const err = new HttpError("Could not find post to update.", 404);
    next(err);
    return err;
  }

  postToUpdate!.title = title;
  postToUpdate!.blurb = blurb;
  postToUpdate!.content = content as [
    {
      type: string;
      text?: string;
      alt?: string;
      language?: string;
      image?: { key?: string; bucket?: string };
    }
  ];
  postToUpdate!.references = references as [
    {
      authors?: string | undefined;
      date?: string | undefined;
      title?: string | undefined;
      url?: string | undefined;
    }
  ];
  postToUpdate!.updatedDay = day;
  postToUpdate!.updatedMonth = month;
  postToUpdate!.updatedYear = year;

  try {
    await postToUpdate.save();
  } catch (error) {
    const err = new HttpError("MongoDB could not save post.", 500);
    next(err);
    return err;
  }

  let imageKeys: string[] = [];
  for (const key of reqKeys) {
    if (/imageKey/.test(key)) {
      imageKeys.push(req.body[key]);
    }
  }

  const deleteImage = async (keys: string[]) => {
    if (keys.length > 0) {
      aws.config.update({
        secretAccessKey: AMZ_SECRET_ACCESS_KEY,
        accessKeyId: AMZ_ACCESS_KEY,
        region: "us-east-1",
      });
      const s3 = new aws.S3();

      for (const imgKey of keys) {
        const params = {
          Bucket: AMZ_S3_BUCKET!,
          Key: imgKey,
        };
        try {
          await s3.deleteObject(params).promise();
        } catch (error) {
          const err = new HttpError("Could not delete image on S3.", 500);
          next(err);
          return err;
        }
      }
    }
  };

  try {
    await deleteImage(imageKeys);
  } catch (error) {
    const err = new HttpError("Could not delete image", 500);
    next(err);
    return err;
  }

  res.status(200).json({ message: "Updated post." });
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
