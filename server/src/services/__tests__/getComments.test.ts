import { addComment } from "../addComment";
import { getComments } from "../getComments";

describe("Get Comments service test group", () => {
  it("Should return empty list if no comments are found", async () => {
    const comments = await getComments();
    expect(comments).toEqual([]);
  });

  it("Should return list of comments if comments are found", async () => {
    await global.createComment();
    const comments = await getComments();
    expect(comments?.length).toBe(1);
  });
});
