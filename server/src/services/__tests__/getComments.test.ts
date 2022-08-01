import { addComment } from "../addComment";
import { getComments } from "../getComments";

describe("Get Comments service test group", () => {
  it("Should return empty list if no comments are found", async () => {
    const comments = await getComments();
    expect(comments).toEqual([]);
  });

  it("Should return list of comments if comments are found", async () => {
    const data = {
      comment: "Test comment",
      user: {
        name: "Test user",
        image: "Test Image",
      },
    };
    const comment = await addComment(data);
    const comments = await getComments();
    expect(comments?.length).toBe(1);
  });
});
