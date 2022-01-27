import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

interface UserDoc {
  username: string;
  password: string;
  comments: any[];
}

export const userModel = model<UserDoc>("User", userSchema);
