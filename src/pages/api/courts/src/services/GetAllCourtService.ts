import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllCourtService() {
    try {
        const courts = await prisma.court.findMany({
            include: {
                sportCenter: true,
                floor: true,
                sports: true,
            },
        })

        return { data: courts, status: HttpStatus.SUCCESS }
    } catch (error) {
        return { data: { message: (error as Error).message }, status: HttpStatus.BAD_REQUEST }
    }
}
