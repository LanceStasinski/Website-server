import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/check-auth";
import { postComment, createPost, getPostHeaders } from "../controllers/blog-controller";
import upload from "../middleware/file-upload";

const router = express.Router();

router.get('/posts', getPostHeaders)

router.use(auth);

router.post('/create-post', upload.any(), createPost);

router.post("/comment", check("newComment").not().isEmpty(), postComment);

export default router;
