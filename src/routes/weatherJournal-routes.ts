import express from "express";
import { check } from "express-validator";

import { auth } from '../middleware/check-auth';
import {
  login,
  postEntry,
  updatePreferences,
} from "../controllers/weatherJournal-controller";

const router = express.Router();

router.post(
  "/auth",
  [check("username").not().isEmpty(), check("password").isLength({ min: 5 })],
  login
);

router.post("/new-entry", [check("zip").not().isEmpty()], postEntry);

router.use(auth);

router.post(
  "/preferences",
  [check("unitPreference").not().isEmpty(), check("zipCode").not().isEmpty()],
  updatePreferences
);



export default router;
