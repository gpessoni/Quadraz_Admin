import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { GetSportCenterByIDSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getSportCenterByIDService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = GetSportCenterByIDSchema.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const sport = await prisma.sportCenter.findUnique({
            where: {
                id: id?.toString(),
            },
            include: {
                Court: {
                    include: {
                        sports: true,
                        floor: true,
                    },
                },
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
