import Joi from "joi"

export const CreateSpecialScheduleSchema = Joi.object({
    day: Joi.number().required().messages({
        "number.empty": `Day cannot be an empty field`,
        "any.required": `Day is a required field`,
    }),
    description: Joi.string().optional(),
    startTime: Joi.string().required().messages({
        "string.empty": `Start time cannot be an empty field`,
        "any.required": `Start time is a required field`,
    }),
    endTime: Joi.string().required().messages({
        "string.empty": `End time cannot be an empty field`,
        "any.required": `End time is a required field`,
    }),
    courtId: Joi.string().optional(),
    sportCenterId: Joi.string().optional(),
})

export const UpdateSpecialScheduleSchema = Joi.object({
    day: Joi.number().required().messages({
        "number.empty": `Day cannot be an empty field`,
        "any.required": `Day is a required field`,
    }),
    description: Joi.string().optional(),
    startTime: Joi.string().required().messages({
        "string.empty": `Start time cannot be an empty field`,
        "any.required": `Start time is a required field`,
    }),
    endTime: Joi.string().required().messages({
        "string.empty": `End time cannot be an empty field`,
        "any.required": `End time is a required field`,
    }),
    courtId: Joi.string().optional(),
    sportCenterId: Joi.string().optional(),
})

export const DeleteSpecialScheduleSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport ID must be a valid UUID`,
    }),
})

export const GetSpecialScheduleByIDSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport ID must be a valid UUID`,
    }),
})
