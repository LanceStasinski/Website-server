import mongoose, { Schema, model } from "mongoose";

const weatherUserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  entries: [
    {
      weather: {
        description: { type: String, required: true },
        icon: { type: String, required: true },
        temp: { type: Number, required: true },
        wind: {
          speed: { type: Number, required: true },
          deg: { type: Number, required: true },
        },
      },
      location: { type: String, required: true },
      subject: { type: String, required: true },
      text: { type: String, required: true },
      date: {
        month: { type: String, required: true },
        day: { type: String, required: true },
        year: { type: String, required: true },
      },
    },
  ],
  unitPreference: { type: String, required: true },
  zipCode: { type: String, required: true },
});

interface WeatherUserDoc {
  username: string;
  password: string;
  entries: [
    {
      weather: {
        description: string;
        icon: string;
        temp: number;
        wind: {
          speed: number;
          deg: number;
        };
      };
      location: string;
      subject: string;
      text: string;
      date: {
        month: string;
        day: string;
        year: string;
      };
    }
  ];
  unitPreference: "imperial" | "metric" | "standard";
  zipCode: string;
}

export const weatherUserModel = model<WeatherUserDoc>(
  "WeatherUser",
  weatherUserSchema
);
