import { Types } from "mongoose";
import request from "supertest";
import { app } from "../../../app";

describe("Toggle vote router test group", () => {
  it("Should return tampered error if invalid comment id is passed", async () => {
    const res = await request(app).put("/api/v1/comments/123").send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(419);
    expect(res.body.msg).toBe("Invalid comment id");
  });

  it("Should return error if no user ID is given", async () => {
    const res = await request(app).put("/api/v1/comments/123").send({});
    expect(res.status).toBe(418);
    expect(res.body.msg).toBe("Validation error, please enter valid inputs");
    expect(res.body.errors).toHaveLength(3);

    expect(res.body.errors[0].message).toBe("User id is required");
  });

  it("Should return validation error if invalid user ID is given", async () => {
    const res = await request(app).put("/api/v1/comments/123").send({ userId: 123 });
    expect(res.status).toBe(418);
    expect(res.body.msg).toBe("Validation error, please enter valid inputs");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].message).toBe("User id must be a string");
  });

  it("Should return error if invalid reply id is given", async () => {
    const comment = await global.createComment();
    const res = await request(app).put(`/api/v1/comments/${comment._id}/231`).send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(419);
    expect(res.body.msg).toBe("Invalid reply id");
  });

  it("Should upvote comment if user has not voted", async () => {
    const comment = await global.createComment();
    const res = await request(app).put(`/api/v1/comments/${comment._id}`).send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(201);
    expect(res.body).toBe(true);
  });
  it("Should downvote comment if user has already voted", async () => {
    const comment = await global.createComment();
    const id = new Types.ObjectId();
    const res = await request(app).put(`/api/v1/comments/${comment._id}`).send({ userId: id });
    expect(res.status).toBe(201);
    expect(res.body).toBe(true);

    const res2 = await request(app).put(`/api/v1/comments/${comment._id}`).send({ userId: id });
    expect(res2.status).toBe(201);
    expect(res2.body).toBe(false);
  });
  it("Should upvote reply if user has not voted", async () => {
    const comment = await global.createComment();
    const reply = await global.createReply(comment._id);
    const res = await request(app).put(`/api/v1/comments/${comment._id}/${reply}`).send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(201);
    expect(res.body).toBe(true);
  });
  it("Should downvote reply if user has already voted", async () => {
    const comment = await global.createComment();
    const reply = await global.createReply(comment._id);
    const id = new Types.ObjectId();
    const res = await request(app).put(`/api/v1/comments/${comment._id}/${reply}`).send({ userId: id });
    expect(res.status).toBe(201);
    expect(res.body).toBe(true);

    const res2 = await request(app).put(`/api/v1/comments/${comment._id}/${reply}`).send({ userId: id });
    expect(res2.status).toBe(201);
    expect(res2.body).toBe(false);
  });
  it("Should return not found error if comment does not exist", async () => {
    const res = await request(app).put(`/api/v1/comments/${new Types.ObjectId()}`).send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(420);
    expect(res.body.msg).toBe("Comment not found");
  });
  it("Should return not found error if reply does not exist", async () => {
    const comment = await global.createComment();
    const res = await request(app).put(`/api/v1/comments/${comment._id}/${new Types.ObjectId()}`).send({ userId: new Types.ObjectId() });
    expect(res.status).toBe(420);
    expect(res.body.msg).toBe("Reply not found");
  });
});
