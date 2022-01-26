import express from "express";

import { getNLPData } from "../controllers/nlpApp-controller";

const router = express.Router();

router.post("/add", getNLPData);

export default router;