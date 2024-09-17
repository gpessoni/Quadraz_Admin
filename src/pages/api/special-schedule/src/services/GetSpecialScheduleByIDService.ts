import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { GetSpecialScheduleByIDSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getSpecialSchedulesByIDService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = GetSpecialScheduleByIDSchema.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const SpecialSchedules = await prisma.specialSchedule.findUnique({
            where: {
                id: id?.toString(),
            },
            include: {
                court: true,
                SportCenter: true,
            },
        })

        if (SpecialSchedules) {
            return res.status(HttpStatus.SUCCESS).json(SpecialSchedules)
        }

        return sendErrorResponse(res, HttpStatus.NOT_FOUND, "SpecialSchedules not found")
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
