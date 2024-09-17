import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { deleteLockerSchema } from "../validation/validation"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsModification"

export default async function deleteLockerService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { error } = deleteLockerSchema.validate(req.query)

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ")
            throw new Error(errorMessage)
        }

        const { id } = req.query

        await prisma.locker.delete({
            where: {
                id: id?.toString(),
            },
            include: {
                sportCenter: true,
            },
        })

        return res.status(HttpStatus.SUCCESS).json({ message: "Locker deleted successfully" })
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}