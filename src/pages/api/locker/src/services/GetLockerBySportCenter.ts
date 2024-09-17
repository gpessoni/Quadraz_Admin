import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList"

export default async function GetLockerBySportCenter(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query

        const Locker = await prisma.locker.findMany({
            where: {
                sportCenterId: id?.toString(),
            },
            include: {
                sportCenter: true,
            },
        })

        if (Locker) {
            return res.status(HttpStatus.SUCCESS).json(Locker)
        }
    } catch (error) {
        return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message)
    }
}
