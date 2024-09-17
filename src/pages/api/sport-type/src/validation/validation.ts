import Joi from "joi"

export const CreateSportTypeSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": `Name cannot be an empty field`,
        "any.required": `Name is a required field`,
    }),
    heightOfficial: Joi.number().required().messages({
        "string.empty": `Height cannot be an empty field`,
        "any.required": `Height is a required field`,
    }),
    widthOfficial: Joi.number().required().messages({
        "string.empty": `Width cannot be an empty field`,
        "any.required": `Width is a required field`,
    }),
    sportId: Joi.string().required().messages({
        "string.empty": `Sport ID cannot be an empty field`,
        "any.required": `Sport ID is a required field`,
        "string.uuid": `Sport ID must be a valid UUID`,
    }),
})

export const UpdateSportTypeSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": `Name cannot be an empty field`,
        "any.required": `Name is a required field`,
    }),
    heightOfficial: Joi.number().required().messages({
        "string.empty": `Height cannot be an empty field`,
        "any.required": `Height is a required field`,
    }),
    widthOfficial: Joi.number().required().messages({
        "string.empty": `Width cannot be an empty field`,
        "any.required": `Width is a required field`,
    }),
})

export const DeleteSportTypeSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport ID must be a valid UUID`,
    }),
})

export const GetSportTypeByIDSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport ID must be a valid UUID`,
    }),
})
