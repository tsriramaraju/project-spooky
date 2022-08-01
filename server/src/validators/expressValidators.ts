import { body } from "express-validator";

const commentValidation = body("comment")
  .isString()
  .withMessage("Comment must be a string")
  .not()
  .isEmpty()
  .withMessage("Comment is required")
  .isLength({ min: 10 })
  .withMessage("Comment must be min 10 characters long")
  .trim();

const userNameValidation = body("user.name")
  .isString()
  .withMessage("User name must be a string")
  .not()
  .isEmpty()
  .withMessage("User name is required")
  .isLength({ min: 3 })
  .withMessage("User name must be min 3 characters long");

const userImageValidation = body("user.image")
  .isString()
  .withMessage("User image must be a string")
  .not()
  .isEmpty()
  .withMessage("User image is required")
  .isURL()
  .withMessage("User image must be a URL");

export { commentValidation, userNameValidation, userImageValidation };
