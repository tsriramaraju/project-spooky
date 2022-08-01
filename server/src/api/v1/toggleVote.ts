import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { ResourceNotFoundError, TamperedRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { toggleUpvote } from "../../services";
import { userIdValidation } from "../../validators";

const router = Router();

/**
 *  @desc      Toggles comment vote
 *  @route     PUT /api/v1/comments/:id
 *  @access    Public
 *  @returns   toggle status
 */
router.put("/:id", [userIdValidation, validateRequest], async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    throw new TamperedRequestError("Invalid comment id");
  }

  const status = await toggleUpvote(id, userId);

  if (typeof status === "string") throw new ResourceNotFoundError(status);

  res.status(201).json(status);
});

export { router as toggleVoteRouter };
