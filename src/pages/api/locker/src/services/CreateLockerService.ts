import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { createLockerSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createLockerService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = createLockerSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { sportCenterId, hasLocker, hasShower, hasTowel, hasToiletries } = req.body

        const sportCenter = await prisma.sportCenter.findUnique({
            where: {
                id: sportCenterId,
            },
        })

        if (!sportCenter) {
            throw new Error("Sport center not found")
        }

        const sport = await prisma.locker.create({
            data: {
                sportCenterId,
                hasLocker,
                hasShower,
                hasTowel,
                hasToiletries,
            },
            include: {
                sportCenter: true,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
