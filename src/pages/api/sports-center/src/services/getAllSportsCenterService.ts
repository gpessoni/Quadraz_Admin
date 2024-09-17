import { NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"

export default async function getAllSportsCenterService(res: NextApiResponse) {
    const sports = await prisma.sportCenter.findMany({
        include: {
            Court: {
                include: {
                    sports: true,
                    floor: true,
                },
            },
        },
    })

    return res.json(sports)
}
