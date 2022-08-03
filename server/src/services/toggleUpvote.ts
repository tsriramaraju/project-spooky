import { ServerError } from "../errors";
import { Comment } from "../models/comments.model";

export const toggleUpvote = async (data: { commentId: string; userId: string; replyId?: string }) => {
  try {
    const { commentId, userId, replyId } = data;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return "Comment not found";
    }

    let upVoted = false;
    let votes = 0;

    if (replyId) {
      // find the reply
      const replyIndex = comment.replies.findIndex((reply) => reply._id.toString() === replyId.toString());

      if (replyIndex === -1) {
        return "Reply not found";
      }

      // check if user has already upvoted the reply

      if (comment.replies[replyIndex].votes.find((vote) => vote.toString() === userId.toString())) {
        comment.replies[replyIndex].votes = comment.replies[replyIndex].votes.filter((vote) => vote !== userId);
        upVoted = false;
      } else {
        comment.replies[replyIndex].votes.push(userId);
        upVoted = true;
      }

      votes = comment.replies[replyIndex].votes.length;
    } else {
      if (comment.votes.find((vote) => vote.toString() === userId.toString())) {
        comment.votes = comment.votes.filter((vote) => vote !== userId);
        upVoted = false;
      } else {
        //     Check if user has already up voted the comment
        comment.votes.push(userId);
        upVoted = true;
      }

      votes = comment.votes.length;
    }

    await comment.save();

    return { votes, upVoted };
  } catch (error) {
    console.log(error);

    throw new ServerError(error.message);
  }
};
