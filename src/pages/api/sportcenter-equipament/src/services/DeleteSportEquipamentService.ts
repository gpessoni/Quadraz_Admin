import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { deleteSportEquipamentValidation } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function deleteSportEquipamentService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = deleteSportEquipamentValidation.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        await prisma.sportCenterEquipment.delete({
            where: {
                id: id?.toString(),
            },
        })

        return res.status(HttpStatus.SUCCESS).json({ message: "SportEquipament deleted successfully" })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}