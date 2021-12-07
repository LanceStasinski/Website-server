import mongoose, { Schema, model } from "mongoose";

const postsSchema = new Schema({
  title: { type: String, required: true },
  blurb: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  year: { type: String, required: true },
  content: [
    {
      type: { type: String, required: true },
      text: { type: String, required: false },
      alt: { type: String, required: false },
      language: { type: String, required: false },
      image: {
        key: { type: String, required: false },
        bucket: { type: String, required: false },
      },
    },
  ],
  references: [
    {
      authors: { type: String, required: false },
      date: { type: String, required: false },
      title: { type: String, required: false },
      url: { type: String, required: false },
    }
  ],

  comments: [{ type: mongoose.Types.ObjectId, required: false, ref: "Comment" }],
  admin: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
});

interface PostsDoc {
  title: string;
  blurb: string;
  month: string;
  day: string;
  year: string;
  content: [
    {
      type: string;
      text?: string;
      alt?: string;
      language?: string;
      image?: {
        key?: string;
        bucket?: string;
      }
    }
  ],
  references: [
    {
      authors?: string;
      date?: string;
      title?: string;
      url?: string;
    }
  ]

  comments?: any[];
  admin: any;
}

export const postModel = model<PostsDoc>("Post", postsSchema);