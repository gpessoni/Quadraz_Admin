import { NextApiRequest, NextApiResponse } from "next"
import getAllFloorService from "./src/services/GetAllFloorService"

export default async function categories(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data, status } = req.method === "GET" ? await getAllFloorService() : { data: { message: "Method not allowed" }, status: 405 }

        return res.status(status).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
