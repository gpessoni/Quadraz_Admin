import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { UpdateRestaurantSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateLockerService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = UpdateRestaurantSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { sportCenterId, hasAlcohol, hasNonAlcohol, hasSnacks, hasSkewer, hasSandwich, observation } = req.body

        const sport = await prisma.restaurant.update({
            where: {
                id: id?.toString(),
            },
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
