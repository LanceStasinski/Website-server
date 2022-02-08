import mongoose, { Schema, model } from "mongoose";

const weatherEntrySchema = new Schema({
  weather: {
    description: { type: String, required: true },
    icon: { type: String, required: true },
    temp: { type: Number, required: true },
    wind: {
      speed: { type: Number, required: true },
      deg: { type: Number, required: true }
    }
  },
  location: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  date: {
    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "WeatherUser",
  },
});

interface WeatherEntryDoc {
  weather: {
    description: string;
    icon: string;
    temp: number;
    wind: {
      speed: number;
      deg: number;
    }
  };
  location: string;
  subject: string;
  text: string;
  date: {
    month: string;
    day: string;
    year: string;
  }
  creatorId: any;
}

export const weatherEntryModel = model<WeatherEntryDoc>(
  "WeatherEntry",
  weatherEntrySchema
);
