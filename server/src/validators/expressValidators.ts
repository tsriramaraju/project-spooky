import { body } from "express-validator";
import { Types } from "mongoose";

const commentValidation = body("comment")
  .not()
  .isEmpty()
  .withMessage("Comment is required")
  .isString()
  .withMessage("Comment must be a string")
  .isLength({ min: 10 })
  .withMessage("Comment must be min 10 characters long")
  .trim();

const replyValidation = body("reply")
  .not()
  .isEmpty()
  .withMessage("Reply is required")
  .isString()
  .withMessage("Reply must be a string")
  .isLength({ min: 10 })
  .withMessage("Reply must be min 10 characters long")
  .trim();

const userNameValidation = body("user.name")
  .not()
  .isEmpty()
  .withMessage("User name is required")
  .isString()
  .withMessage("User name must be a string")
  .isLength({ min: 3 })
  .withMessage("User name must be min 3 characters long");

const userImageValidation = body("user.image")
  .not()
  .isEmpty()
  .withMessage("User image is required")
  .isString()
  .withMessage("User image must be a string")
  .isURL()
  .withMessage("User image must be a URL");

const user_id_validation = body("user.id")
  .not()
  .isEmpty()
  .withMessage("User id is required")
  .isString()
  .withMessage("User id must be a string")
  .custom((value, { req }) => {
    if (Types.ObjectId.isValid(value)) return true;
    throw new Error("User id must be a valid ObjectId");
  });
const userIdValidation = body("userId")
  .not()
  .isEmpty()
  .withMessage("User id is required")
  .isString()
  .withMessage("User id must be a string")
  .custom((value, { req }) => {
    if (Types.ObjectId.isValid(value)) return true;
    throw new Error("User id must be a valid ObjectId");
  });

export { commentValidation, userNameValidation, userImageValidation, userIdValidation, user_id_validation, replyValidation };
