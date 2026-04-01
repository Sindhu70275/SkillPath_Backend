import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/i)
    .required()
    .messages({
      "any.required": "FULL_NAME_REQUIRED: \"Full name is required\"",
      "string.min": "FULL_NAME_MIN_LENGTH: \"Full name must be at least 3 characters\"",
      "string.max": "FULL_NAME_MAX_LENGTH: \"Full name must be max 50 characters\"",
      "string.pattern.base": "FULL_NAME_PATTERN: \"Full name can only contain letters and spaces\"",
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
