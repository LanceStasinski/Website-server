import mongoose, { Schema, model } from "mongoose";

const weatherEntrySchema = new Schema({
  date: { type: String, required: true },
  temp: { type: String, required: true },
  weather: { type: String, required: true },
  feelings: { type: String, required: true },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "WeatherUser",
  },
});

interface WeatherEntryDoc {
  date: string;
  temp: string;
  weather: string;
  feelings: string;
  creatorId: any;
}

export const weatherEntryModel = model<WeatherEntryDoc>(
  "WeatherEntry",
  weatherEntrySchema
);
