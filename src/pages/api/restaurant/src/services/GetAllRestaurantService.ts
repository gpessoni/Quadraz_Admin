import { prisma } from "@/pages/api/config/prisma"
import { HttpStatus } from "@/pages/api/config/http/httpUtilsList"

export default async function getAllRestaurantService() {
    try {
        const Restaurant = await prisma.restaurant.findMany({
            include: {
                sportCenter: true,
            },
        })

        return { data: Restaurant, status: HttpStatus.SUCCESS }
    } catch (error) {
        return { data: { message: (error as Error).message }, status: HttpStatus.BAD_REQUEST }
    }
}
