import { Comment } from "../models/comments.model";

export const getComments = async () => {
  try {
    const comments = await Comment.find({ postId: "testPost" });
    return comments;
  } catch (error) {
    console.log(error);
  }
};
