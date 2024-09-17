import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { createFloorValidation } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createFloorService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = createFloorValidation.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { name } = req.body

        const sport = await prisma.floor.create({
            data: {
                name,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
