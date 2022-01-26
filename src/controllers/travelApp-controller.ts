import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import requestGeoInfo from "../helpers/travelApp/requestGeoInfo";
import {
  requestWeatherCurrent,
  requestWeatherForecast,
} from "../helpers/travelApp/requestWeatherInfo";
import requestImage from "../helpers/travelApp/requestImage";
import requestCountryInfo from "../helpers/travelApp/requestCountryInfo";
import {
  updateWeatherForecast,
  updateWeatherCurrent,
} from "./../helpers/travelApp/updateWeather";

dotenv.config();
const GEOUSER = process.env.GEO_USERNAME;
const IMAGE_KEY = process.env.PIXABAY_KEY;
const WEATHER_KEY = process.env.WEATHER_KEY;

export const postTripData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { destination, arrival, departure, daysAway, tripNum } = req.body;
  let trip = {};
  try {
    const coords: any = await requestGeoInfo(destination, GEOUSER!);
    const { totalResultsCount, geonames } = coords;
    const { lat, lng, countryCode, name, countryName, adminName1 } =
      geonames[0];
    if (totalResultsCount === 0) {
      trip = {
        message: "Location not recognized",
      };
    } else {
      const currentWeather = await requestWeatherCurrent(
        lat,
        lng,
        WEATHER_KEY!
      );
      const forecastWeather = await requestWeatherForecast(
        lat,
        lng,
        WEATHER_KEY!
      );
      const image = await requestImage(
        countryCode,
        name,
        countryName,
        adminName1,
        IMAGE_KEY!
      );
      const countryInfo: any = await requestCountryInfo(countryCode);
      trip = {
        message: "OK",
        arrival,
        departure,
        daysAway,
        destination,
        current: currentWeather,
        forecast: forecastWeather,
        imageURL: image![1],
        imageTag: image![0],
        countryName: countryInfo[0].name.official,
        capital: countryInfo[0].capital[0],
        currency:
          countryInfo[0].currencies[Object.keys(countryInfo[0].currencies)[0]]
            .name,
        flag: countryInfo[0].flags.png,
        language:
          countryInfo[0].languages[Object.keys(countryInfo[0].languages)[0]],
        region: countryInfo[0].subregion,
        tripNum,
        lat,
        lng,
      };
    }
  } catch (error) {
    console.log(error);
  }
  res.send(trip);
};

export const updateTripData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lng } = req.body;
  let trip;
  try {
    const current = await updateWeatherCurrent(lat, lng, WEATHER_KEY!);
    const forecast = await updateWeatherForecast(lat, lng, WEATHER_KEY!);
    trip = {
      current,
      forecast,
    };
  } catch (error) {
    console.log(error);
  }
  res.send(trip);
};
