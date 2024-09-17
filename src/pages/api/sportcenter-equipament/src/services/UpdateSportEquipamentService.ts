import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { updateSportEquipamentValidation } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateSportEquipamentService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = updateSportEquipamentValidation.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { quantity, price, sportCenterId, equipmentId } = req.body

        const sportCenter = await prisma.sportCenter.findUnique({
            where: {
                id: sportCenterId,
            },
        })

        if (!sportCenter) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport Center not found")
        }

        const equipment = await prisma.equipment.findUnique({
            where: {
                id: equipmentId,
            },
        })

        if (!equipment) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport Center not found")
        }

        const sport = await prisma.sportCenterEquipment.update({
            where: {
                id: id?.toString(),
            },
            data: {
                quantity,
                price,
                sportCenterId,
                equipmentId,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
