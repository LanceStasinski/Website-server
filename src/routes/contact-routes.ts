import express from "express";
import { check } from "express-validator";

import {sendMessage} from '../controllers/contact-controller'

const router = express.Router();

router.post("/", [
  check("firstName").not().isEmpty(),
  check("lastName").not().isEmpty(),
  check("email").not().isEmpty(),
  check("message").not().isEmpty(),
], sendMessage);

export default router;