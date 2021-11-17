import express from "express";
import { check } from "express-validator";
import { signUp } from "../controllers/auth-controllers";

const router = express.Router();

router.post("/signup", [
  check("username").not().isEmpty(),
  check("password").isLength({ min: 6 }),
  check("confirmPassword").isLength({ min: 6 }),
], signUp);

router.post("/login");

export default router;
