import {Types} from "mongoose";
import { addComment } from "../addComment";
import { toggleUpvote } from "../toggleUpvote";

describe("Toggle UpVote service test group", () => {
  it("Should return not found message if non existing comment id is given", async () => {
    const commentId = new Types.ObjectId().toString();
    const userId = new Types.ObjectId().toString();
    const result = await toggleUpvote(commentId, userId);
    expect(result).toEqual("Comment not found");
  });

  it("Should upvote the comment if user has not upvoted the comment", async () => {
    const data = {
      comment: "Test comment",
      user: {
        name: "Test user",
        image: "Test Image",
      },
    };

    const comment = await addComment(data);

    const result = await toggleUpvote(comment!._id, data.user.name);

    expect(result).toEqual({ upVoted: true, votes: 1 });
  });

  it("Should downvote the comment if user has upvoted the comment", async () => {
    const data = {
      comment: "Test comment",
      user: {
        name: "Test user",
        image: "Test Image",
      },
    };

    const comment = await addComment(data);
    const result = await toggleUpvote(comment!._id, data.user.name);

    expect(result).toEqual({ upVoted: true, votes: 1 });

    const result2 = await toggleUpvote(comment!._id, data.user.name);

    expect(result2).toEqual({ upVoted: false, votes: 0 });
  });
});
