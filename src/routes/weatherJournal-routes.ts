import express from "express";
import { check } from "express-validator";

import { login } from "../controllers/weatherJournal-controller";

const router = express.Router();

router.post(
  "/auth",
  [check("username").not().isEmpty(), check("password").isLength({ min: 5 })],
  login
);

export default router;
