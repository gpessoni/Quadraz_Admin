import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { CreatePriceTable } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createPriceTableService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = CreatePriceTable.validate(req.body, { abortEarly: false })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { description, price, courtId } = req.body

        const sport = await prisma.priceTable.create({
            data: {
                description,
                price,
                Court: {
                    connect: { id: courtId },
                },
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
