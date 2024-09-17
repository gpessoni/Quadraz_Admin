import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllScheduleByCourtService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query

        if (!id) {
            return sendErrorResponse(res, HttpStatus.BAD_REQUEST, "Court ID is required")
        }

        const schedule = await prisma.courtSchedule.findMany({
            where: {
                courtId: id.toString(),
            },
        })

        if (!schedule) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Court not found")
        }

        res.status(HttpStatus.SUCCESS).json({ schedule })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
