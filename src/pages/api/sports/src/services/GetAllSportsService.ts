import { NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"

export default async function getAllSportsService(res: NextApiResponse) {
    const sports = await prisma.sports.findMany()

    return res.json(sports)
}
