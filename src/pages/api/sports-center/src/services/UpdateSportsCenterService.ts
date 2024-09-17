import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { UpdateSportCenterSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateSportsCenterService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = UpdateSportCenterSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const {
            name,
            description,
            address,
            neighborhood,
            number,
            city,
            state,
            country,
            email,
            phone,
            hasWifi,
            hasParking,
            opensOnHolidays,
            parkingCapacity,
            hasPlayground,
            playgroundObs,
            wifiPassword,
        } = req.body

        const sport = await prisma.sportCenter.update({
            where: {
                id: id?.toString(),
            },
            data: {
                name,
                description,
                address,
                neighborhood,
                number,
                city,
                state,
                country,
                email,
                phone,
                hasWifi,
                hasParking,
                opensOnHolidays,
                parkingCapacity,
                hasPlayground,
                playgroundObs,
                wifiPassword,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
