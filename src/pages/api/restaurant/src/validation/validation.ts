import Joi from "joi"

export const CreateRestaurantSchema = Joi.object({
    sportCenterId: Joi.string().required().messages({
        "any.required": "Sport center id is required",
        "string.empty": "Sport center id is required",
    }),
    hasAlcohol: Joi.boolean().required().messages({
        "any.required": "Has alcohol is required",
        "boolean.empty": "Has alcohol is required",
    }),
    hasNonAlcohol: Joi.boolean().required().messages({
        "any.required": "Has non alcohol is required",
        "boolean.empty": "Has non alcohol is required",
    }),
    hasSnacks: Joi.boolean().required().messages({
        "any.required": "Has snacks is required",
        "boolean.empty": "Has snacks is required",
    }),
    hasSkewer: Joi.boolean().required().messages({
        "any.required": "Has skewer is required",
        "boolean.empty": "Has skewer is required",
    }),
    hasSandwich: Joi.boolean().required().messages({
        "any.required": "Has sandwich is required",
        "boolean.empty": "Has sandwich is required",
    }),
    observation: Joi.string().optional(),
})

export const UpdateRestaurantSchema = Joi.object({
    sportCenterId: Joi.string().messages({
        "any.required": "Sport center id is required",
        "string.empty": "Sport center id is required",
    }),
    hasAlcohol: Joi.boolean().messages({
        "any.required": "Has alcohol is required",
        "boolean.empty": "Has alcohol is required",
    }),
    hasNonAlcohol: Joi.boolean().messages({
        "any.required": "Has non alcohol is required",
        "boolean.empty": "Has non alcohol is required",
    }),
    hasSnacks: Joi.boolean().messages({
        "any.required": "Has snacks is required",
        "boolean.empty": "Has snacks is required",
    }),
    hasSkewer: Joi.boolean().messages({
        "any.required": "Has skewer is required",
        "boolean.empty": "Has skewer is required",
    }),
    hasSandwich: Joi.boolean().required().messages({
        "any.required": "Has sandwich is required",
        "boolean.empty": "Has sandwich is required",
    }),
    observation: Joi.string().optional(),
})

export const DeleteRestaurantSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Sport center id is required",
        "string.empty": "Sport center id is required",
    }),
})

export const GetRestaurantSchemaByID = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Sport center id is required",
        "string.empty": "Sport center id is required",
    }),
})
