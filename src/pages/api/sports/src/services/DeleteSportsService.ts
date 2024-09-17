import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { deleteSportsValidation } from "./../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function deleteSportsService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = deleteSportsValidation.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        await prisma.sports.delete({
            where: {
                id: id?.toString(),
            },
        })

        return res.status(HttpStatus.SUCCESS).json({ message: "Sport deleted successfully" })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
