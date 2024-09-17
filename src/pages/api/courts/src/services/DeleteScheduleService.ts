import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { DeleteCourtSchedule } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function deleteScheduleService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = DeleteCourtSchedule.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        await prisma.courtSchedule.delete({
            where: {
                id: id?.toString(),
            },
        })

        return res.status(HttpStatus.SUCCESS).json({ message: "Schedule deleted successfully" })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}