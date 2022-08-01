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
    expect(res.body.errors[0].message).toBe("User id must be a string");
    expect(res.body.errors[1].message).toBe("User id is required");
  });

  it("Should return validation error if invalid user ID is given", async () => {
    const res = await request(app).put("/api/v1/comments/123").send({ userId: 123 });
    expect(res.status).toBe(418);
    expect(res.body.msg).toBe("Validation error, please enter valid inputs");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].message).toBe("User id must be a string");
  });

  it("Should return validation error if invalid user ID is given", async () => {
    const res = await request(app).put("/api/v1/comments/123").send({ userId: "hey there" });
    expect(res.status).toBe(418);
    expect(res.body.msg).toBe("Validation error, please enter valid inputs");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].message).toBe("User id must be a valid ObjectId");
  });
});
