import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { GetSportTypeByIDSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getSportTypesByIDService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = GetSportTypeByIDSchema.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const SportTypes = await prisma.sportTypes.findUnique({
            where: {
                id: id?.toString(),
            },
            include: {
                sport: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        if (SportTypes) {
            return res.status(HttpStatus.SUCCESS).json(SportTypes)
        }

        return sendErrorResponse(res, HttpStatus.NOT_FOUND, "SportTypes not found")
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
