import { NextApiRequest, NextApiResponse } from "next"
import getAllSportsService from "./src/services/GetAllSportsService"

export default async function categories(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getAllSportsService(res) : res.status(405).json({ message: "Method not allowed" })
}
