import { body } from "express-validator";

const nameValidation = body("name")
  .isString()
  .withMessage("User name must be String")
  .not()
  .isEmpty()
  .withMessage("User name is required")
  .isLength({ min: 3 })
  .withMessage("User name must be min 3 characters long")
  .trim();

export { nameValidation };
