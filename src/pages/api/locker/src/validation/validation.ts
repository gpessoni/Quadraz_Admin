import Joi from "joi"

export const createLockerSchema = Joi.object({
    sportCenterId: Joi.string().required(),
    hasLocker: Joi.boolean().required(),
    hasShower: Joi.boolean().required(),
    hasTowel: Joi.boolean().required(),
    hasToiletries: Joi.boolean().required(),
})

export const updateLockerSchema = Joi.object({
    sportCenterId: Joi.string().required(),
    hasLocker: Joi.boolean().required(),
    hasShower: Joi.boolean().required(),
    hasTowel: Joi.boolean().required(),
    hasToiletries: Joi.boolean().required(),
})

export const deleteLockerSchema = Joi.object({
    id: Joi.string().required(),
})

export const getLockerSchemaById = Joi.object({
    id: Joi.string().required(),
})
