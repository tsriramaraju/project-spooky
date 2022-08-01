import { ServerError } from "../errors";
import { CommentAttrs } from "../interfaces/comments";
import { Comment } from "../models/comments.model";

export const addComment = async (comment: CommentAttrs) => {
  try {
    const newComment = await Comment.build(comment).save();
    return newComment;
  } catch (error) {
    console.log(error);

    throw new ServerError(error.message);
  }
};
