import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { getCourtByIDSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getCourtByIDService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = getCourtByIDSchema.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const court = await prisma.court.findUnique({
            where: {
                id: id?.toString(),
            },
            include: {
                sportCenter: true,
                floor: true,
                sports: true,
            },
        })

        if (court) {
            return res.status(HttpStatus.SUCCESS).json(court)
        }

        return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Court not found")
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
