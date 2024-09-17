import Joi from "joi"

export const createEquipmentsValidation = Joi.object({
    name: Joi.string().trim().required().min(2).max(100).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
})

export const updateEquipmentsValidation = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
})

export const getEquipmentByIDValidation = Joi.object({
    id: Joi.string().trim().uuid().required().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty",
        "string.uuid": "ID must be a valid UUID",
    }),
})

export const deleteEquipmentsValidation = Joi.object({
    id: Joi.string().trim().uuid().required().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty",
        "string.uuid": "ID must be a valid UUID",
    }),
})
