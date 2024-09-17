import { NextApiRequest, NextApiResponse } from "next"
import getFloorByIDService from "../src/services/GetFloorByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getFloorByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
