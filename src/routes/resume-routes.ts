import express from "express";

import { getResume } from '../controllers/resume-controller';

const router = express.Router();

router.get("/", getResume);

export default router;
