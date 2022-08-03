import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection, Types } from "mongoose";
import { CommentDoc, ReplyDoc } from "../interfaces/comments";
import { Comment } from "../models/comments.model";

declare global {
  function createComment(): Promise<CommentDoc>;
  function createReply(commentId: string): Promise<string>;
}

let mongo: any;
beforeAll(async () => {
  process.env.PORT = "4545";
  process.env.MONGO_URL = "Some random url";
  process.env.SLACK_SECRET = "Some random secret";

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
      id: new Types.ObjectId().toString(),
    },
  };

  const comment = Comment.build(data).save();
  return comment;
};

global.createReply = async (commentId: string): Promise<string> => {
  const replyId = new Types.ObjectId().toString();
  const reply: ReplyDoc = {
    reply: "test reply",
    _id: replyId,
    date: new Date(),
    votes: [],
    user: {
      name: "test user",
      image: "test image",
      id: new Types.ObjectId().toString(),
    },
  };

  const comment = await Comment.findById(commentId);

  comment!.replies.push(reply);

  await comment!.save();

  return replyId;
};
