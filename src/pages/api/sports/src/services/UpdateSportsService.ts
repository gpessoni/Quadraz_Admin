import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { updateSportsValidation } from "./../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateSportsService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = updateSportsValidation.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { name } = req.body

        const sport = await prisma.sports.update({
            where: {
                id: id?.toString(),
            },
            data: {
                name,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
