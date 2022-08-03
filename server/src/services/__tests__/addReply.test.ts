import { Types } from "mongoose";
import { addReply } from "../addReply";
import { ReplyAttrs } from "../../interfaces/comments";
import { Comment } from "../../models/comments.model";

describe("Add Reply service test group", () => {
  it("Should add reply to comment on entering valid parameters", async () => {
    const comment = await global.createComment();
    const reply: ReplyAttrs = {
      reply: "Test reply",
      user: {
        name: "Test user",
        image: "Test Image",
        id: new Types.ObjectId().toString(),
      },
    };
    const res = await addReply(reply, comment._id);

    expect(Types.ObjectId.isValid(res)).toBe(true);

    const newComment = await Comment.findById(comment._id);
    expect(newComment?.replies.length).toBe(1);
  });

  it("Should return not found message if non existing comment id is given", async () => {
    const reply: ReplyAttrs = {
      reply: "Test reply",
      user: {
        name: "Test user",
        image: "Test Image",
        id: new Types.ObjectId().toString(),
      },
    };
    const res = await addReply(reply, new Types.ObjectId().toString());

    expect(res).toEqual("Comment not found");
  });
});
