import { AppError } from "../utils/AppError.js";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new AppError(errorMessage, 400);
    }

    req.validatedBody = value;
    next();
  };
};
