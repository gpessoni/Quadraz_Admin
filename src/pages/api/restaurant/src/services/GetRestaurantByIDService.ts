import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { GetRestaurantSchemaByID } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function getRestaurantByIDService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = GetRestaurantSchemaByID.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        const RestaurantAux = await prisma.restaurant.findUnique({
            where: {
                id: id?.toString(),
            },
            include: {
                sportCenter: true,
            },
        })

        if (RestaurantAux) {
            return res.status(HttpStatus.SUCCESS).json(RestaurantAux)
        }

        return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Restaurant not found")
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
