import { ServerError } from "../errors";
import { Comment } from "../models/comments.model";

export const toggleUpvote = async (commentId: string, userId: string) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return "Comment not found";
    }

    let upVoted = false;

    //     Check if user has already up voted the comment
    if (comment.votes.find((vote) => vote.toString() === userId.toString())) {
      comment.votes = comment.votes.filter((vote) => vote !== userId);
      upVoted = false;
    } else {
      comment.votes.push(userId);
      upVoted = true;
    }
    await comment.save();

    return upVoted;
  } catch (error) {
    console.log(error);

    throw new ServerError(error.message);
  }
};
