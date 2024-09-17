import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { updateCourtSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateCourtService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = updateCourtSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { name, hasLight, hasRoof, sports, hasGrandstand, grandstandCapacity, width, height, floorId, sportCenterId } = req.body

        const sportCenter = await prisma.sportCenter.findUnique({
            where: {
                id: sportCenterId,
            },
        })

        if (!sportCenter) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport center not found")
        }

        const floor = await prisma.floor.findUnique({
            where: {
                id: floorId,
            },
        })

        if (!floor) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Floor not found")
        }

        sports.forEach(async (sportId: string) => {
            const sport = await prisma.sportTypes.findUnique({
                where: {
                    id: sportId,
                },
            })

            if (!sport) {
                return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport not found")
            }
        })

        const sportsAux = await prisma.sportTypes.findMany({
            where: {
                id: {
                    in: sports,
                },
            },
        })

        const updatedCourt = await prisma.court.update({
            where: {
                id: id?.toString(),
            },
            data: {
                name,
                hasLight,
                hasRoof,
                hasGrandstand,
                width,
                height,
                grandstandCapacity,
                sports: {
                    set: sportsAux.map((sport) => ({ id: sport.id })),
                },
                floor: {
                    connect: { id: floorId },
                },
                sportCenter: {
                    connect: { id: sportCenterId },
                },
            },
            select: {
                id: true,
                name: true,
                hasLight: true,
                hasGrandstand: true,
                grandstandCapacity: true,
                height: true,
                width: true,
                hasRoof: true,
                floor: true,
                sportCenter: true,
                sports: true,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(updatedCourt)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
