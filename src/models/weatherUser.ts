import mongoose, { Schema, model } from "mongoose";

const weatherUserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  entries: [
    { type: mongoose.Types.ObjectId, required: true, ref: "WeatherEntries" },
  ],
  unitPreference: { type: String, required: true },
  zipCode: { type: String, required: true },
});

interface WeatherUserDoc {
  username: string;
  password: string;
  entries: any[];
  unitPreference: "imperial" | "metric" | "standard";
  zipCode: string;
}

export const weatherUserModel = model<WeatherUserDoc>(
  "WeatherUser",
  weatherUserSchema
);
