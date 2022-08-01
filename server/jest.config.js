module.exports = {
  verbose: true,
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  testEnvironment: "node",
};
