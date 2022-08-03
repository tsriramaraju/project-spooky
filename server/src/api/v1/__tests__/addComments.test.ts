import request from "supertest";
import { app } from "../../../app";
import { getComments } from "../../../services";
import { Types } from "mongoose";

const commentId = new Types.ObjectId().toString();
const imageURL = "https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png";

describe("Add Comment route test group", () => {
  it("should return error if comment is not string", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: 1,
        user: {
          name: "test user",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);

    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("Comment must be a string");
  });

  it("should return error if comment is empty", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "",
        user: {
          name: "test user",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("Comment is required");
  });

  it("should return error if comment is less than 10 characters", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test",
        user: {
          name: "test user",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("Comment must be min 10 characters long");
  });
  it("should return error if user name is not string", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: 1,
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("User name must be a string");
  });

  it("should return error if user name is empty", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("User name is required");
  });

  it("should return error if user name is less than 3 characters", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "te",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User name must be min 3 characters long");
  });

  it("should return error if user picture is not string", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: 1,
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("User image must be a string");
  });

  it("should return error if user picture is empty", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: "",
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("User image is required");
  });

  it("should return error if user picture is not URL", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: "test image",
          id: commentId,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User image must be a URL");
  });

  it("should return error if user id is not string", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: imageURL,
          id: 1,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User id must be a string");
  });

  it("should return error if user id is empty", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: imageURL,
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].message).toBe("User id must be a string");
  });

  it("should return error if user id is not a valid id", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: imageURL,
          id: "test",
        },
      });

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User id must be a valid ObjectId");
  });

  it("Should add comment if all fields are valid", async () => {
    const response = await request(app)
      .post("/api/v1/comments")
      .send({
        comment: "test comment",
        user: {
          name: "test user",
          image: imageURL,
          id: commentId,
        },
      });

    expect(response.status).toBe(201);

    const body = response.body;

    const comment = await getComments();
    expect(comment).toHaveLength(1);

    expect(comment[0].comment).toBe("test comment");

    expect(comment[0].user.name).toBe("test user");

    expect(JSON.stringify(comment[0]._id)).toBe(JSON.stringify(body._id));
  });
});
