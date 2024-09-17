import { NextApiRequest, NextApiResponse } from "next"
import getAllRestaurantService from "./src/services/GetAllRestaurantService"

export default async function restaurants(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data, status } = req.method === "GET" ? await getAllRestaurantService() : { data: { message: "Method not allowed" }, status: 405 }

        return res.status(status).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
