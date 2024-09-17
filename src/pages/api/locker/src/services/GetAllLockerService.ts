import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllLockerService() {
    try {
        const Locker = await prisma.locker.findMany({
            include: {
                sportCenter: true,
            },
        })

        return { data: Locker, status: HttpStatus.SUCCESS }
    } catch (error) {
        return { data: { message: (error as Error).message }, status: HttpStatus.BAD_REQUEST }
    }
}
