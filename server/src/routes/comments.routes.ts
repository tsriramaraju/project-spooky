import { Application } from "express";
import { getCommentsRouter, addCommentsRouter } from "../api/v1";

export const commentsRoutes = (path: string, app: Application) => {
  app.use(path, getCommentsRouter);
  app.use(path, addCommentsRouter);
};
