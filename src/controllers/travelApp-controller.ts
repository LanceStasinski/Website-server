import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { requestImage } from "../helpers/travelApp/requestImage";

dotenv.config();
const GEOUSER = process.env.GEO_USERNAME;
const IMAGE_KEY = process.env.PIXABAY_KEY;
const WEATHER_KEY = process.env.WEATHER_KEY;
