import { Application } from "express";
import { commentsRoutes } from "./routes/comments.routes";
export const initializeRoutes = (app: Application) => {
  commentsRoutes("/api/v1/comments", app);
};
