import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { BadRequestError, TamperedRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { addReply } from "../../services";
import { replyValidation, userNameValidation, userImageValidation, user_id_validation } from "../../validators";

const router = Router();

/**
 *  @desc      add comment
 *  @route     POST /api/v1/comments/:id
 *  @access    Public
 *  @returns   comment doc
 */
router.post(
  "/:id",
  [replyValidation, userNameValidation, userImageValidation, user_id_validation, validateRequest],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    if (!Types.ObjectId.isValid(id)) throw new TamperedRequestError("Invalid comment id");

    const result = await addReply(data, id);

    if (!Types.ObjectId.isValid(result)) throw new BadRequestError(result);

    res.status(201).json(result);
  }
);

export { router as addReplyRouter };
