import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const NLP_KEY = process.env.NLP_KEY;

export const getNLPData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newsURL = req.body.url;
  try {
    const response = await axios(
      `https://api.meaningcloud.com/sentiment-2.1?key=${NLP_KEY}&url=${newsURL}&lang=en`,
      { method: "POST" }
    );
    const apiData = response.data;
    res.send(apiData);
  } catch (error) {
    console.log("error", error);
  }
};
