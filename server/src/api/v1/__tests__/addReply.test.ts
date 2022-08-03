import { app } from "../../../app";
import { Types } from "mongoose";
import request from "supertest";
import { Comment } from "../../../models/comments.model";

const userID = new Types.ObjectId().toString();
const imageURL = "https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png";

describe("AddReply route test group", () => {
  it("Should return Reply ID if valid inputs are given", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    console.log(response.error);
    expect(response.status).toBe(201);

    expect(Types.ObjectId.isValid(response.body)).toBe(true);

    const comments = await Comment.findById(comment._id);
    expect(comments?.replies).toHaveLength(1);
    expect(comments?.replies[0]?.reply).toBe("hey there this is a reply");
  });

  it("Should return error if comment id is not valid", async () => {
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/invalid_id`).send(reply);

    expect(response.status).toBe(419);
    expect(response.body.msg).toBe("Invalid comment id");
  });

  it("Should return not found if comment  is not found", async () => {
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/5e8f8f8f8f8f8f8f8f8f8f8f`).send(reply);

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Comment not found");
  });

  it("Should return validation error if reply is empty", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "",
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("Reply is required");
  });

  it("Should return validation error if reply is less than 10 characters", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there",
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("Reply must be min 10 characters long");
  });

  it("Should return validation error if reply is not string", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: 123,
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("Reply must be a string");
  });

  it("Should return validation error if reply is not given", async () => {
    const comment = await global.createComment();
    const reply = {
      user: {
        name: "test user",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].message).toBe("Reply is required");
  });

  it("Should return validation error if user name is not given", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].message).toBe("User name is required");
  });

  it("Should return validation error if user name is not string", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: 123,
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User name must be a string");
  });

  it("Should return validation error if user name is less than 3 characters", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "te",
        image: imageURL,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User name must be min 3 characters long");
  });

  it("Should return validation error if user image is not given", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].message).toBe("User image is required");
  });

  it("Should return validation error if user image is not string", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: 123,
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].message).toBe("User image must be a string");
  });

  it("Should return validation error if user image is not URL", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: "hey there this is not image",
        id: userID,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User image must be a URL");
  });

  it("Should return validation error if user id is not given", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].message).toBe("User id is required");
  });

  it("Should return validation error if user id is not valid ID", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
        id: "123",
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User id must be a valid ObjectId");
  });

  it("Should return validation error if user id is not string", async () => {
    const comment = await global.createComment();
    const reply = {
      reply: "hey there this is a reply",
      user: {
        name: "test user",
        image: imageURL,
        id: 123,
      },
    };
    const response = await request(app).post(`/api/v1/comments/${comment._id}`).send(reply);

    expect(response.status).toBe(418);
    expect(response.body.msg).toBe("Validation error, please enter valid inputs");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe("User id must be a string");
  });
});
