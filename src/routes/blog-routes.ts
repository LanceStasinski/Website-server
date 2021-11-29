import express from "express";
import { check } from "express-validator";

const router = express.Router();

router.post("/comment", check("newComment").not().isEmpty());

export default router;
