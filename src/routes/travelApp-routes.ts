import express from "express";

import {
  postTripData,
  updateTripData,
} from "../controllers/travelApp-controller";

const router = express.Router();

router.post("/add", postTripData);

router.post("/update", updateTripData);

export default router;
