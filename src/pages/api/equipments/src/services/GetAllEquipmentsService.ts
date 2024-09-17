import { NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"

export default async function getAllEquipmentsService(res: NextApiResponse) {
    const sports = await prisma.equipment.findMany()

    return res.json(sports)
}
