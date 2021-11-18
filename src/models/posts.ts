import mongoose, { Schema, model } from "mongoose";

const postsSchema = new Schema({
  title: { type: String, required: true },
  content: [
    {
      position: { type: Number, required: true },
      contentType: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  category: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
  admin: [{ type: mongoose.Types.ObjectId, ref: "Admin", required: true }],
});

interface PostsDoc {
  title: string;
  content: { position: number; contentType: string; content: string }[];
  category: String;
  comments: any[];
  admin: any[];
}

export const postModel = model<PostsDoc>("Post", postsSchema);
