import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";

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
