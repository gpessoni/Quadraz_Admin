import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function GetRestaurantBySportCenter(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query

        const Restaurant = await prisma.restaurant.findMany({
            where: {
                sportCenterId: id?.toString(),
            },
            include: {
                sportCenter: true,
            },
        })

        if (Restaurant) {
            return res.status(HttpStatus.SUCCESS).json(Restaurant)
        }
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
