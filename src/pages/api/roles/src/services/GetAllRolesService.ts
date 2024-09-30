import { NextApiResponse } from "next"
import { prisma } from "@/pages/api/config/prisma"

export default async function getAllRolesService(res: NextApiResponse) {
    const sports = await prisma.roles.findMany()

    return res.json(sports)
}
