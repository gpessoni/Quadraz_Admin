import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { updateRolesValidation } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function updateRolesService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = updateRolesValidation.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query
        const { name } = req.body

        const Role = await prisma.roles.update({
            where: {
                id: id?.toString(),
            },
            data: {
                name,
            },
        })

        return res.status(HttpStatus.SUCCESS).json(Role)
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
