import { Router, Request, Response } from "express";
import { validateRequest } from "../../middlewares";
import { addComment } from "../../services";
import { commentValidation, userNameValidation, userImageValidation } from "../../validators";

const router = Router();

/**
 *  @desc      add comment
 *  @route     POST /api/v1/comments/
 *  @access    Public
 *  @returns   comment doc
 */
router.post("/", [commentValidation, userNameValidation, userImageValidation, validateRequest], async (req: Request, res: Response) => {
  const data = req.body;
  const result = await addComment(data);
  res.status(201).json(result);
});

export { router as addCommentsRouter };
