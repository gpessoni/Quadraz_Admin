import { NextApiRequest, NextApiResponse } from "next"
import getAllCourtService from "./src/services/GetAllCourtService"

export default async function court(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data, status } = req.method === "GET" ? await getAllCourtService() : { data: { message: "Method not allowed" }, status: 405 }

        return res.status(status).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
