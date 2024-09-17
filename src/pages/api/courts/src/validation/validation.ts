import Joi from "joi"

export const createCourtSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "O nome é obrigatório",
        "any.required": "O nome é obrigatório",
    }),
    hasLight: Joi.boolean().required().messages({
        "boolean.empty": "O campo iluminação é obrigatório",
        "any.required": "O campo iluminação é obrigatório",
    }),
    hasRoof: Joi.boolean().required().messages({
        "boolean.empty": "O campo cobertura é obrigatório",
        "any.required": "O campo cobertura é obrigatório",
    }),
    hasGrandstand: Joi.boolean().required().messages({
        "string.empty": `Has Grandstand cannot be an empty field`,
        "any.required": `Has Grandstand is a required field`,
    }),
    grandstandCapacity: Joi.number().required().messages({
        "string.empty": `Grandstand Capacity cannot be an empty field`,
        "any.required": `Grandstand Capacity is a required field`,
    }),
    width: Joi.number().required().messages({
        "string.empty": `Width cannot be an empty field`,
        "any.required": `Width is a required field`,
    }),
    height: Joi.number().required().messages({
        "string.empty": `Height cannot be an empty field`,
        "any.required": `Height is a required field`,
    }),
    sports: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "O esporte é obrigatório",
        "any.required": "O esporte é obrigatório",
    }),
    floorId: Joi.string().required().messages({
        "string.empty": "O piso é obrigatório",
        "any.required": "O piso é obrigatório",
    }),
    sportCenterId: Joi.string().required().messages({
        "string.empty": "O centro esportivo é obrigatório",
        "any.required": "O centro esportivo é obrigatório",
    }),
})

export const updateCourtSchema = Joi.object({
    name: Joi.string().messages({
        "string.empty": "O nome é obrigatório",
        "any.required": "O nome é obrigatório",
    }),
    hasLight: Joi.boolean().messages({
        "boolean.empty": "O campo iluminação é obrigatório",
        "any.required": "O campo iluminação é obrigatório",
    }),
    hasRoof: Joi.boolean().messages({
        "boolean.empty": "O campo cobertura é obrigatório",
        "any.required": "O campo cobertura é obrigatório",
    }),
    hasGrandstand: Joi.boolean().required().messages({
        "string.empty": `Has Grandstand cannot be an empty field`,
        "any.required": `Has Grandstand is a required field`,
    }),
    grandstandCapacity: Joi.number().required().messages({
        "string.empty": `Grandstand Capacity cannot be an empty field`,
        "any.required": `Grandstand Capacity is a required field`,
    }),
    width: Joi.number().required().messages({
        "string.empty": `Width cannot be an empty field`,
        "any.required": `Width is a required field`,
    }),
    height: Joi.number().required().messages({
        "string.empty": `Height cannot be an empty field`,
        "any.required": `Height is a required field`,
    }),
    sports: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "O esporte é obrigatório",
        "any.required": "O esporte é obrigatório",
    }),
    floorId: Joi.string().messages({
        "string.empty": "O piso é obrigatório",
        "any.required": "O piso é obrigatório",
    }),
    sportCenterId: Joi.string().messages({
        "string.empty": "O centro esportivo é obrigatório",
        "any.required": "O centro esportivo é obrigatório",
    }),
})

export const deleteCourtSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "O id é obrigatório",
        "any.required": "O id é obrigatório",
    }),
})

export const getCourtByIDSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "O id é obrigatório",
        "any.required": "O id é obrigatório",
    }),
})

export const CreatePriceTable = Joi.object({
    description: Joi.string().required().messages({
        "string.empty": "Description cannot be empty.",
        "any.required": "Description is required.",
    }),
    price: Joi.number().required().messages({
        "number.base": "Price must be a number.",
        "any.required": "Price is required.",
    }),
    courtId: Joi.string().required().messages({
        "string.empty": "Court ID cannot be empty.",
        "any.required": "Court ID is required.",
    }),
}).messages({
    "object.unknown": "Unknown field in the price table.",
})

export const DeletePriceTable = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "ID cannot be empty.",
        "any.required": "ID is required.",
        "string.uuid": "ID must be a valid UUID.",
    }),
}).messages({
    "object.unknown": "Unknown field in the price table.",
})

export const CreateCourtSchedule = Joi.object({
    dayOfWeek: Joi.string().required().messages({
        "string.empty": "DayOfWeek cannot be empty.",
        "any.required": "DayOfWeek is required.",
    }),
    startTime: Joi.string().required().messages({
        "string.empty": "StartTime cannot be empty.",
        "any.required": "StartTime is required.",
    }),
    endTime: Joi.string().required().messages({
        "string.empty": "EndTime cannot be empty.",
        "any.required": "EndTime is required.",
    }),
    courtId: Joi.string().required().messages({
        "string.empty": "Court ID cannot be empty.",
        "any.required": "Court ID is required.",
    }),
})

export const DeleteCourtSchedule = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "ID cannot be empty.",
        "any.required": "ID is required.",
        "string.uuid": "ID must be a valid UUID.",
    }),
})
