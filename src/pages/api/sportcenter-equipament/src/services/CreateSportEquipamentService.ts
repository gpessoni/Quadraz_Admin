import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { createSportEquipamentValidation } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createSportEquipamentService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { quantity, price, sportCenterId, equipmentId } = await createSportEquipamentValidation.validateAsync(req.body)

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

        const SportEquipament = await prisma.sportCenterEquipment.create({
            data: {
                quantity,
                price,
                sportCenterId,
                equipmentId,
            },
            include: {
                equipment: true,
                sportCenter: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        res.status(HttpStatus.SUCCESS).json({ SportEquipament })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
