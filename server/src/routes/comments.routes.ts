import { Application } from "express";
import { getCommentsRouter } from "../api/v1";

export const commentsRoutes = (path: string, app: Application) => {
  app.use(path, getCommentsRouter);
};
