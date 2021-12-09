import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true },
  creatorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  postId: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
});

interface CommentDoc extends mongoose.Document {
  comment: string;
  creatorId: any;
  postId: any;
}

export const commentModel = model<CommentDoc>("Comment", commentSchema);
