import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function addEquipmentToSportsCenter(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { sportCenterId, equipmentIds } = req.body

        const existingSportCenter = await prisma.sportCenter.findUnique({
            where: { id: sportCenterId },
        })

        if (!existingSportCenter) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport center not found")
        }

        const existingEquipments = await prisma.equipment.findMany({
            where: { id: { in: equipmentIds } },
        })

        if (existingEquipments.length !== equipmentIds.length) {
            return sendErrorResponse(res, HttpStatus.BAD_REQUEST, "Invalid equipment IDs")
        }

        const updatedSportCenter = await prisma.sportCenter.update({
            where: { id: sportCenterId },
            data: {
                equipments: {
                    connect: equipmentIds.map((id: string) => ({ id })),
                },
            },
            include: {
                equipments: true,
            }
        })

        return res.status(HttpStatus.SUCCESS).json(updatedSportCenter)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
