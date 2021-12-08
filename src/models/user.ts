import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

// userSchema.plugin(uniqueValidator);

interface UserDoc {
  username: string;
  password: string;
  comments: any[];
}

export const userModel = model<UserDoc>("User", userSchema);
