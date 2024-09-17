import { NextApiRequest, NextApiResponse } from "next"
import getAllSportsCenterService from "./src/services/getAllSportsCenterService"

export default async function categories(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getAllSportsCenterService(res) : res.status(405).json({ message: "Method not allowed" })
}
