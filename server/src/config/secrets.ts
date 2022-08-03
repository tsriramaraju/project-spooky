import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.SLACK_SECRET) {
  throw new Error("SLACK_SECRET must be defined");
}
if (!process.env.PUSHER_KEY) {
  throw new Error("PUSHER_KEY must be defined");
}

if (!process.env.PUSHER_SECRET) {
  throw new Error("PUSHER_SECRET must be defined");
}

if (!process.env.PUSHER_APP_ID) {
  throw new Error("PUSHER_APP_ID must be defined");
}

export default {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  slackSecret: process.env.SLACK_SECRET,
  pusher: {
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    appId: process.env.PUSHER_APP_ID,
    cluster: "us2",
    useTLS: true,
  },
};
