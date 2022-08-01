import { connect } from "mongoose";
import secrets from "./secrets";
import "colors";

/**
 * Helps in connecting to mongodb Atlas
 */

export const connectDB = async () => {
  const uri = secrets.mongoURL;
  try {
    await connect(uri, {
      autoIndex: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
    });
    console.log(`Database connected...`.green);
  } catch (err) {
    console.log(`error in connection Database\n${err}`.red);
    process.exit(1);
  }
};
