import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import { CommentDoc } from "../interfaces/comments";
import { Comment } from "../models/comments.model";

declare global {
  function createComment(): Promise<CommentDoc>;
}

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await connect(mongoUri, {
    autoIndex: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
  });
});

beforeEach(async () => {
  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await connection.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

global.createComment = async (): Promise<CommentDoc> => {
  const data = {
    comment: "test comment",
    user: {
      name: "test user",
      image: "test image",
    },
  };

  const comment = Comment.build(data).save();
  return comment;
};
