import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { CreateSpecialScheduleSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function CreateSpecialScheduleService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = CreateSpecialScheduleSchema.validate(req.body, { abortEarly: false })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { day, description, startTime, endTime, courtId, sportCenterId } = req.body

        if (!sportCenterId && !courtId) {
            throw new Error("sportCenterId or courtId is required")
        }

        if (sportCenterId && courtId) {
            throw new Error("sportCenterId and courtId are mutually exclusive")
        }

        const sport = await prisma.specialSchedule.create({
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
