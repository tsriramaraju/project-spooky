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

    expect(typeof result).not.toBe("string");

    if (typeof result === "string") {
      return;
    }
    expect(result.votes).toEqual(1);

    expect(result.upVoted).toEqual(true);
  });

  it("Should downvote the comment if user has upvoted the comment", async () => {
    const comment = await global.createComment();

    const result = await toggleUpvote({ commentId: comment._id, userId: comment.user.id });
    expect(typeof result).not.toBe("string");

    if (typeof result === "string") {
      return;
    }
    expect(result.upVoted).toEqual(true);
    expect(result.votes).toEqual(1);
    const result2 = await toggleUpvote({ commentId: comment._id, userId: comment.user.id });
    expect(typeof result2).not.toBe("string");

    if (typeof result2 === "string") {
      return;
    }
    expect(result2.votes).toEqual(0);
    expect(result2.upVoted).toEqual(false);
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
    expect(typeof result).not.toBe("string");

    if (typeof result === "string") {
      return;
    }
    expect(result.votes).toEqual(1);
    expect(result.upVoted).toEqual(true);
  });

  it("Should downvote the reply if user has upvoted the reply", async () => {
    const comment = await global.createComment();
    const reply = await global.createReply(comment!._id);

    const result = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
      replyId: reply,
    });
    expect(typeof result).not.toBe("string");

    if (typeof result === "string") {
      return;
    }
    expect(result.votes).toEqual(1);
    expect(result.upVoted).toEqual(true);

    const result2 = await toggleUpvote({
      commentId: comment._id,
      userId: comment.user.id,
      replyId: reply,
    });
    expect(typeof result2).not.toBe("string");

    if (typeof result2 === "string") {
      return;
    }
    expect(result2.votes).toEqual(0);
    expect(result2.upVoted).toEqual(false);
  });

  it("Should return not found message if non existing reply id is given", async () => {
    const comment = await global.createComment();
    const replyId = new Types.ObjectId().toString();

    const result = await toggleUpvote({ commentId: comment._id, userId: comment.user.id, replyId });
    expect(result).toEqual("Reply not found");
  });
});
