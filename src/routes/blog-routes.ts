import express from "express";
import { check } from "express-validator";
import { auth } from "../middleware/check-auth";
import { postComment } from "../controllers/blog-controller";

const router = express.Router();

router.use(auth);

router.post("/comment", check("newComment").not().isEmpty(), postComment);

export default router;
