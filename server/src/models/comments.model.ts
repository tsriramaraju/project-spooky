import { Schema, model } from "mongoose";
import { CommentAttrs, CommentDoc, CommentModel } from "../interfaces/comments";

const replySchema = new Schema({
  reply: { type: String, required: true },
  votes: { type: [String], default: [] },
  date: { type: Date, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
});

const commentsSchema = new Schema({
  comment: { type: String, required: true },
  votes: { type: [String], default: [] },
  date: { type: Date, required: true },
  postId: { type: String, default: "testPost" },
  replies: { type: [replySchema], default: [] },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
});

//   postId: { type: Schema.Types.ObjectId, ref: "post" },
//     id: { type: Schema.Types.ObjectId, ref: "user" },
commentsSchema.set("versionKey", "version");

commentsSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment({ ...attrs, date: new Date() });
};

const Comment = model<CommentDoc, CommentModel>("comments", commentsSchema);

export { Comment };
