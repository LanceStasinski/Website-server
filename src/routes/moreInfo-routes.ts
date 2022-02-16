import express from "express";

import { getVideo } from '../controllers/moreInfo-controller';

const router = express.Router();

router.get("/", getVideo);

export default router;
