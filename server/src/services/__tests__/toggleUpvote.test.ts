import { Types } from "mongoose";
import { toggleUpvote } from "../toggleUpvote";

describe("Toggle UpVote service test group", () => {
  it("Should return not found message if non existing comment id is given", async () => {
    const commentId = new Types.ObjectId().toString();
    const userId = new Types.ObjectId().toString();
    const result = await toggleUpvote({ commentId, userId });
    expect(result).toEqual("Comment not found");
  });

  it("Should upvote the comment if user has not upvoted the comment", async () => {
    const comment = await global.createComment();

    const result = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
    });

    expect(result).toEqual(true);
  });

  it("Should downvote the comment if user has upvoted the comment", async () => {
    const comment = await global.createComment();

    const result = await toggleUpvote({ commentId: comment._id, userId: comment.user.id });

    expect(result).toEqual(true);

    const result2 = await toggleUpvote({ commentId: comment._id, userId: comment.user.id });

    expect(result2).toEqual(false);
  });

  it("Should return not found message if non existing comment id is given", async () => {
    const commentId = new Types.ObjectId().toString();
    const userId = new Types.ObjectId().toString();
    const result = await toggleUpvote({ commentId, userId });
    expect(result).toEqual("Comment not found");
  });

  it("Should upvote the reply if user has not upvoted the reply", async () => {
    const comment = await global.createComment();
    const reply = await global.createReply(comment!._id);

    const result = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
      replyId: reply,
    });

    expect(result).toEqual(true);
  });

  it("Should downvote the reply if user has upvoted the reply", async () => {
    const comment = await global.createComment();
    const reply = await global.createReply(comment!._id);

    const result = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
      replyId: reply,
    });

    expect(result).toEqual(true);

    const result2 = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
      replyId: reply,
    });

    expect(result2).toEqual(false);
  });

  it("Should return not found message if non existing reply id is given", async () => {
    const comment = await global.createComment();
    const replyId = new Types.ObjectId().toString();

    const result = await toggleUpvote({ commentId: comment._id, userId: comment.user.id, replyId });
    expect(result).toEqual("Reply not found");
  });
});
