import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { updateLockerSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateLockerService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = updateLockerSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { sportCenterId, hasLocker, hasShower, hasTowel, hasToiletries } = req.body

        const sport = await prisma.locker.update({
            where: {
                id: id?.toString(),
            },
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
