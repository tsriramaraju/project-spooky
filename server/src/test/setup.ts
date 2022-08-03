import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection, Types } from "mongoose";
import { CommentDoc, ReplyDoc } from "../interfaces/comments";
import { Comment } from "../models/comments.model";

declare global {
  function createComment(): Promise<CommentDoc>;
  function createReply(commentId: string): Promise<string>;
}

jest.mock("../utils/sendPusherEvent", () => ({
  sendPusherEvent: jest.fn().mockImplementation((message: any, event: string) => {
    console.log(message, event);
    return true;
  }),
}));

let mongo: any;
beforeAll(async () => {
  process.env.PORT = "4545";
  process.env.MONGO_URL = "Some random url";
  process.env.SLACK_SECRET = "Some random secret";

  process.env.PUSHER_APP_ID = "Some random secret";
  process.env.PUSHER_KEY = "Some random secret";
  process.env.PUSHER_SECRET = "Some random secret";

  jest.setTimeout(50000);

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
  jest.setTimeout(50000);
  await mongo.stop();
  await connection.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

global.createComment = async (): Promise<CommentDoc> => {
  const data = {
    comment: "test comment test comment",
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
    reply: "test reply test reply",
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
