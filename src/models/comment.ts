import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  comment: {type: String, required: true},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

interface CommentDoc extends mongoose.Document {
  comment: string;
  creator: any;
}

export const commentModel = model<CommentDoc>("Comment", commentSchema)