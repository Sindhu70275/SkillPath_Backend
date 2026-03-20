import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_-]{6,20}$/) 
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.pattern.base": "Username can only contain letters, numbers, -, _",
      "string.min": "Username must be at least 6 characters",
      "string.max": "Username must be max 20 characters",
      "any.required": "Username is required",
    }),

  emailId: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special char (@$!%*?&)",
      "any.required": "Password is required",
    }),
});

export const loginSchema = Joi.object({
  emailId: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special char (@$!%*?&)",
      "any.required": "Password is required",
    }),
});
