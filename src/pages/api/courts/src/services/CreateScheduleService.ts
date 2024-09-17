import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { CreateCourtSchedule } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createScheduleService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = CreateCourtSchedule.validate(req.body, { abortEarly: false })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { dayOfWeek, startTime, endTime, courtId } = req.body

        const existCourt = await prisma.court.findFirst({
            where: {
                id: courtId,
            },
        })

        if (!existCourt) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Court not found")
        }

        const schedule = await prisma.courtSchedule.create({
            data: {
                dayOfWeek,
                startTime,
                endTime,
                court: {
                    connect: {
                        id: courtId,
                    },
                },
            },
        })

        return res.status(HttpStatus.SUCCESS).json(schedule)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
