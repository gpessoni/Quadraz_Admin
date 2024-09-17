import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllFloorService() {
    try {
        const floor = await prisma.floor.findMany()

        return { data: floor, status: HttpStatus.SUCCESS }
    } catch (error) {
        return { data: { message: (error as Error).message }, status: HttpStatus.BAD_REQUEST }
    }
}
