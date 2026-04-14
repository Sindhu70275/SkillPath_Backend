import Joi from "joi";

export const setWeeklyGoalSchema = Joi.object({
  weeklyGoal: Joi.number()
    .integer()
    .min(0)
    .max(20)
    .required()
    .messages({
      "number.base": "weeklyGoal must be a number",
      "number.integer": "weeklyGoal must be an integer",
      "number.min": "weeklyGoal must be at least 0",
      "number.max": "weeklyGoal cannot exceed 20",
      "any.required": "weeklyGoal is required",
    }),
});

