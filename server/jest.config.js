process.env.PORT = "4545";
process.env.MONGO_URL = "Some random url";
process.env.SLACK_SECRET = "Some random secret";

module.exports = {
  verbose: true,
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  testEnvironment: "node",
};
