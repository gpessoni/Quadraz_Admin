import Joi from "joi"

export const CreateSportCenterSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": `Name cannot be an empty field`,
        "any.required": `Name is a required field`,
    }),
    description: Joi.string().allow("").optional().messages({
        "string.empty": `Description cannot be an empty field`,
    }),
    address: Joi.string().required().messages({
        "string.empty": `Address cannot be an empty field`,
        "any.required": `Address is a required field`,
    }),
    neighborhood: Joi.string().required().messages({
        "string.empty": `Neighborhood cannot be an empty field`,
        "any.required": `Neighborhood is a required field`,
    }),
    number: Joi.string().required().messages({
        "string.empty": `Number cannot be an empty field`,
        "any.required": `Number is a required field`,
    }),
    city: Joi.string().required().messages({
        "string.empty": `City cannot be an empty field`,
        "any.required": `City is a required field`,
    }),
    state: Joi.string().required().messages({
        "string.empty": `State cannot be an empty field`,
        "any.required": `State is a required field`,
    }),
    country: Joi.string().required().messages({
        "string.empty": `Country cannot be an empty field`,
        "any.required": `Country is a required field`,
    }),
    email: Joi.string().required().messages({
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
    }),
    phone: Joi.string().required().messages({
        "string.empty": `Phone cannot be an empty field`,
        "any.required": `Phone is a required field`,
    }),
    hasWifi: Joi.boolean().required().messages({
        "string.empty": `Has Wifi cannot be an empty field`,
        "any.required": `Has Wifi is a required field`,
    }),
    wifiPassword: Joi.string().optional(),
    hasParking: Joi.boolean().required().messages({
        "string.empty": `Has Parking cannot be an empty field`,
        "any.required": `Has Parking is a required field`,
    }),
    hasPlayground: Joi.boolean().required().messages({
        "string.empty": `Has Playground cannot be an empty field`,
        "any.required": `Has Playground is a required field`,
    }),
    opensOnHolidays: Joi.boolean().required().messages({
        "string.empty": `Opens on Holidays cannot be an empty field`,
        "any.required": `Opens on Holidays is a required field`,
    }),
    parkingCapacity: Joi.number().required().messages({
        "string.empty": `Parking Capacity cannot be an empty field`,
        "any.required": `Parking Capacity is a required field`,
    }),
    logo: Joi.string().optional(),
})

export const UpdateSportCenterSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": `Name cannot be an empty field`,
        "any.required": `Name is a required field`,
    }),
    address: Joi.string().required().messages({
        "string.empty": `Address cannot be an empty field`,
        "any.required": `Address is a required field`,
    }),
    neighborhood: Joi.string().required().messages({
        "string.empty": `Neighborhood cannot be an empty field`,
        "any.required": `Neighborhood is a required field`,
    }),
    number: Joi.string().required().messages({
        "string.empty": `Number cannot be an empty field`,
        "any.required": `Number is a required field`,
    }),
    city: Joi.string().required().messages({
        "string.empty": `City cannot be an empty field`,
        "any.required": `City is a required field`,
    }),
    state: Joi.string().required().messages({
        "string.empty": `State cannot be an empty field`,
        "any.required": `State is a required field`,
    }),
    country: Joi.string().required().messages({
        "string.empty": `Country cannot be an empty field`,
        "any.required": `Country is a required field`,
    }),
    email: Joi.string().required().messages({
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
    }),
    phone: Joi.string().required().messages({
        "string.empty": `Phone cannot be an empty field`,
        "any.required": `Phone is a required field`,
    }),
    hasWifi: Joi.boolean().required().messages({
        "string.empty": `Has Wifi cannot be an empty field`,
        "any.required": `Has Wifi is a required field`,
    }),
    hasParking: Joi.boolean().required().messages({
        "string.empty": `Has Parking cannot be an empty field`,
        "any.required": `Has Parking is a required field`,
    }),
    hasPlayground: Joi.boolean().required().messages({
        "string.empty": `Has Playground cannot be an empty field`,
        "any.required": `Has Playground is a required field`,
    }),
    opensOnHolidays: Joi.boolean().required().messages({
        "string.empty": `Opens on Holidays cannot be an empty field`,
        "any.required": `Opens on Holidays is a required field`,
    }),
    parkingCapacity: Joi.number().required().messages({
        "string.empty": `Parking Capacity cannot be an empty field`,
        "any.required": `Parking Capacity is a required field`,
    }),
})

export const DeleteSportCenterSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport Center ID must be a valid UUID`,
    }),
})

export const GetSportCenterByIDSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": `ID cannot be an empty field`,
        "any.required": `ID is a required field`,
        "string.uuid": `Sport Center ID must be a valid UUID`,
    }),
})
