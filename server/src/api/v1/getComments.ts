import { Router, Request, Response } from "express";
import { getComments } from "../../services";

const router = Router();

/**
 *  @desc      get all comments
 *  @route     Get /api/v1/comments/
 *  @access    Public
 *  @returns   comments array
 */
router.get("/", async (req: Request, res: Response) => {
  const comments = await getComments();

  res.status(201).json(comments);
});

export { router as getCommentsRouter };
