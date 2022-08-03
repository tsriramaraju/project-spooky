import { Types } from "mongoose";
import { ServerError } from "../errors";
import { ReplyAttrs } from "../interfaces/comments";
import { Comment } from "../models/comments.model";

export const addReply = async (reply: ReplyAttrs, commentId: string) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return "Comment not found";

    const id = new Types.ObjectId().toString();

    comment.replies.push({ ...reply, date: new Date(), votes: [], _id: id });

    await comment.save();

    return id;
  } catch (error) {
    throw new ServerError(error.message);
  }
};
