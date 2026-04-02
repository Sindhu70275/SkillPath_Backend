import Joi from "joi";

export const updateProfileSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/i)
    .optional()
    .messages({
      "string.empty": "Full name cannot be empty",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name must be maximum 50 characters",
      "string.pattern.base": "Full name can only contain letters and spaces",
    }), 
});
