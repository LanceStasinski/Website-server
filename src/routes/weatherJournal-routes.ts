import express from "express";
import { login } from "../controllers/weatherJournal-controller";

const router = express.Router();

router.post('/auth', login);

export default router;