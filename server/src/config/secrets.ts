import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.SLACK_SECRET) {
  throw new Error("SLACK_SECRET must be defined");
}

export default {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  slackSecret: process.env.SLACK_SECRET,
};
