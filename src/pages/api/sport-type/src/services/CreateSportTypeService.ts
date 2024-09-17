import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { CreateSportTypeSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function createSportTypeService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, heightOfficial, widthOfficial, sportId } = await CreateSportTypeSchema.validateAsync(req.body)

        const sport = await prisma.sports.findUnique({
            where: {
                id: sportId,
            },
        })

        if (!sport) {
            return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Sport not found")
        }

        const sportType = await prisma.sportTypes.create({
            data: {
                name,
                heightOfficial,
                widthOfficial,
                sportId,
            },
            include: {
                sport: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        res.status(HttpStatus.SUCCESS).json({ sportType })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
