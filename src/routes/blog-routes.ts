import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/check-auth";
import { postComment, createPost } from "../controllers/blog-controller";
import upload from "../middleware/file-upload";

const router = express.Router();

router.use(auth);

router.post('/create-post', upload.any(), createPost);

router.post("/comment", check("newComment").not().isEmpty(), postComment);

export default router;
