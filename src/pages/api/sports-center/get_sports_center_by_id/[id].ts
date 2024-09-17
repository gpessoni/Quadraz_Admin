import { NextApiRequest, NextApiResponse } from "next"
import getSportCenterByIDService from "../src/services/GetSportCenterByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSportCenterByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
