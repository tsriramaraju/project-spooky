import request from "supertest";
import { app } from "../../../app";

describe("Get comments route test group", () => {
  it("should return empty array if no comments exist", async () => {
    const response = await request(app).get("/api/v1/comments");
    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(0);
  });

  it("should return array of comments if comments exist", async () => {
    await global.createComment();
    await global.createComment();
    await global.createComment();
    const response = await request(app).get("/api/v1/comments");
    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(3);
  });
});
