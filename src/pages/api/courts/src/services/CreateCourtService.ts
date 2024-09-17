import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { createCourtSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createCourtService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = createCourtSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { name, hasLight, hasRoof, sports, hasGrandstand, grandstandCapacity, width, height, floorId, sportCenterId } = req.body

        console.log(req.body)

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

        const sportsAux = await prisma.sportTypes.findMany({
            where: {
                id: {
                    in: sports,
                },
            },
        })

        if (!sportsAux) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sports not found")
        }

        const court = await prisma.court.create({
            data: {
                name,
                hasLight,
                hasRoof,
                hasGrandstand,
                width,
                height,
                grandstandCapacity,
                floor: {
                    connect: { id: floorId },
                },
                sportCenter: {
                    connect: { id: sportCenterId },
                },
                sports: {
                    connect: sportsAux.map((sport) => ({ id: sport.id })),
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

        return res.status(HttpStatus.SUCCESS).json(court)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
