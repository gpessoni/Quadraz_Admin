import Joi from "joi";

export const createSportsValidation = Joi.object({
  name: Joi.string().trim().required().min(2).max(100).messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
});

export const updateSportsValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
});

export const getSportByIDValidation = Joi.object({
  id: Joi.string().trim().uuid().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
    "string.uuid": "ID must be a valid UUID",
  }),
});

export const deleteSportsValidation = Joi.object({
  id: Joi.string().trim().uuid().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
    "string.uuid": "ID must be a valid UUID",
  }),
});
