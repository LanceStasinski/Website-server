import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/check-auth";
import {
  login,
  postEntry,
  updatePreferences,
  getEntries,
  deleteEntry,
  updateEntry,
} from "../controllers/weatherJournal-controller";

const router = express.Router();

router.post(
  "/auth",
  [check("username").not().isEmpty(), check("password").isLength({ min: 5 })],
  login
);

router.use(auth);

router.get("/entries", getEntries);

router.delete("/entries", check("id").not().isEmpty(), deleteEntry);

router.patch('/entries/:entryId', [
  check("zip").not().isEmpty(),
  check("subject").not().isEmpty(),
  check("message").not().isEmpty(),
], updateEntry)

router.post(
  "/preferences",
  [check("unitPreference").not().isEmpty(), check("zipCode").not().isEmpty()],
  updatePreferences
);

router.post(
  "/new-entry",
  [
    check("zip").not().isEmpty(),
    check("subject").not().isEmpty(),
    check("message").not().isEmpty(),
  ],
  postEntry
);

export default router;
