import mongoose, { Schema, model } from "mongoose";

const weatherUserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
  entries: [
    { type: mongoose.Types.ObjectId, required: true, ref: "WeatherEntries" },
  ],
});

interface WeatherUserDoc {
  username: string;
  password: string;
  entries: any[];
}

export const weatherUserModel = model<WeatherUserDoc>(
  "WeatherUser",
  weatherUserSchema
);