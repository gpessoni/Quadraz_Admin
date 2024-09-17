import Joi from "joi";

export const createFloorValidation = Joi.object({
  name: Joi.string().trim().required().min(2).max(100).messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
});

export const updateFloorValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
});

export const getFloorByIDValidation = Joi.object({
  id: Joi.string().trim().uuid().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
    "string.uuid": "ID must be a valid UUID",
  }),
});

export const deleteFloorValidation = Joi.object({
  id: Joi.string().trim().uuid().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
    "string.uuid": "ID must be a valid UUID",
  }),
});
