import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
});

interface AdminDoc {
  username: string;
  password: string;
  comments: any[];
  posts: any[];
}

export const adminModel = model<AdminDoc>("Admin", adminSchema);
