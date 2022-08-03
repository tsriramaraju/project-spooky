import { Types } from "mongoose";
import { Comment } from "../../models/comments.model";
import { addComment } from "../addComment";

describe("Add Comment service test group", () => {
  it("Should add comment to post on entering valid parameters", async () => {
    const existingComments = await Comment.find({ postId: "testPost" });

    expect(existingComments.length).toBe(0);

    const comment = {
      comment: "Test comment",
      user: {
        name: "Test user",
        image: "Test Image",
        id: new Types.ObjectId().toString(),
      },
    };

    const res = await addComment(comment);

    expect(res?.comment).toBe(comment.comment);
    const newComments = await Comment.find({ postId: "testPost" });

    expect(newComments.length).toBe(1);
  });
});
