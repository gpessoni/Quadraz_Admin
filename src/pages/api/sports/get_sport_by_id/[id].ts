import { NextApiRequest, NextApiResponse } from "next"
import getSportByIDService from "../src/services/GetSportByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSportByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
