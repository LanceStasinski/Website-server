import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/check-auth";
import {
  postComment,
  createPost,
  getPostHeaders,
  getPost,
  deleteComment,
} from "../controllers/blog-controller";
import upload from "../middleware/file-upload";

const router = express.Router();

router.get("/posts", getPostHeaders);

router.get("/posts/:postId", getPost);

router.use(auth);

router.post(
  "/create-post",
  [check("title").not().isEmpty(), check("blurb").not().isEmpty()],
  upload.any(),
  createPost
);

router.post(
  "/comment",
  [check("newComment").not().isEmpty(), check("date").not().isEmpty()],
  postComment
);

router.delete("/comment/:commentId", deleteComment);

export default router;
