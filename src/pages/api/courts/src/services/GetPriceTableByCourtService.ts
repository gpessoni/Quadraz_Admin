import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getPriceTableByCourtService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query

        if (!id) {
            return sendErrorResponse(res, HttpStatus.BAD_REQUEST, "Court ID is required")
        }

        const priceTable = await prisma.priceTable.findMany({
            where: {
                courtId: id.toString(),
            },
        })

        if (!priceTable) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Court not found")
        }

        res.status(HttpStatus.SUCCESS).json({ priceTable })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
