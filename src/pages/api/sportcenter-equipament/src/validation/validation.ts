import Joi from "joi"

export const createSportEquipamentValidation = Joi.object({
    quantity: Joi.number().required().messages({
        "any.required": "Quantity is required",
        "number.empty": "Quantity cannot be empty",
    }),
    price: Joi.number().required().messages({
        "any.required": "Price is required",
        "number.empty": "Price cannot be empty",
    }),
    sportCenterId: Joi.string().required().messages({
        "any.required": "SportEquipament  ID is required",
        "string.empty": "SportEquipament  ID cannot be empty",
    }),
    equipmentId: Joi.string().required().messages({
        "any.required": "Equipment ID is required",
        "string.empty": "Equipment ID cannot be empty",
    }),
})

export const updateSportEquipamentValidation = Joi.object({
    quantity: Joi.number().required().messages({
        "any.required": "Quantity is required",
        "number.empty": "Quantity cannot be empty",
    }),
    price: Joi.number().required().messages({
        "any.required": "Price is required",
        "number.empty": "Price cannot be empty",
    }),
    sportCenterId: Joi.string().required().messages({
        "any.required": "SportEquipament  ID is required",
        "string.empty": "SportEquipament  ID cannot be empty",
    }),
    equipmentId: Joi.string().required().messages({
        "any.required": "Equipment ID is required",
        "string.empty": "Equipment ID cannot be empty",
    }),
})

export const getSportByIDValidation = Joi.object({
    id: Joi.string().trim().uuid().required().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty",
        "string.uuid": "ID must be a valid UUID",
    }),
})

export const deleteSportEquipamentValidation = Joi.object({
    id: Joi.string().trim().uuid().required().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty",
        "string.uuid": "ID must be a valid UUID",
    }),
})
