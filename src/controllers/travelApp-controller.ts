import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import requestGeoInfo from "../helpers/travelApp/requestGeoInfo";
import requestImage from "../helpers/travelApp/requestImage";

dotenv.config();
const GEOUSER = process.env.GEO_USERNAME;
const IMAGE_KEY = process.env.PIXABAY_KEY;
const WEATHER_KEY = process.env.WEATHER_KEY;

export const postTripData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {destination, arrival, departure, daysAway, tripNum} = req.body;
  let trip = {};
  try {
    const coords: any = await requestGeoInfo(destination, GEOUSER!);
    if (coords.totalResults.Count === 0) {
      trip = {
        message: "Location not recognized",
      };
    } else {

    }
  } catch (error) {
    console.log(error);
  }
};
