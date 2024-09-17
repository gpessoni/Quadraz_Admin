import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllSportTypesService() {
    try {
        const SportTypes = await prisma.sportTypes.findMany({
            include: {
                sport: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        return { data: SportTypes, status: HttpStatus.SUCCESS }
    } catch (error) {
        return { data: { message: (error as Error).message }, status: HttpStatus.BAD_REQUEST }
    }
}
