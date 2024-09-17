import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { UpdateSpecialScheduleSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function UpdateSpecialScheduleService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = UpdateSpecialScheduleSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { day, description, startTime, endTime, courtId, sportCenterId } = req.body

        const sport = await prisma.specialSchedule.update({
            where: {
                id: id?.toString(),
            },
            data: {
                day,
                description,
                startTime,
                endTime,
                courtId,
                sportCenterId,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
