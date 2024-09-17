import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { CreateRestaurantSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createLockerService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = CreateRestaurantSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { sportCenterId, hasAlcohol, hasNonAlcohol, hasSnacks, hasSkewer, hasSandwich, observation } = req.body

        const sportCenter = await prisma.sportCenter.findUnique({
            where: {
                id: sportCenterId,
            },
        })

        if (!sportCenter) {
            throw new Error("Sport center not found")
        }

        const sport = await prisma.restaurant.create({
            data: {
                sportCenterId,
                hasAlcohol,
                hasNonAlcohol,
                hasSnacks,
                hasSkewer,
                hasSandwich,
                observation,
            },
            include: {
                sportCenter: true,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(sport)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
