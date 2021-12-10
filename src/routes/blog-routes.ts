import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/check-auth";
import {
  postComment,
  createPost,
  getPostHeaders,
  getPost,
  deleteComment,
  deletePost,
} from "../controllers/blog-controller";
import upload from "../middleware/file-upload";

const router = express.Router();

router.get("/posts", getPostHeaders);

router.get("/posts/:postId", getPost);

router.use(auth);

router.post(
  "/create-post", upload.any(), createPost
);

router.delete("/delete/:postId", deletePost);

router.post(
  "/comment",
  [check("newComment").not().isEmpty(), check("date").not().isEmpty()],
  postComment
);

router.delete("/comment/:commentId", deleteComment);

export default router;
