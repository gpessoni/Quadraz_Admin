import { NextApiRequest, NextApiResponse } from "next"
import GetLockerBySportCenter from "../src/services/GetLockerBySportCenter"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await GetLockerBySportCenter(req, res) : res.status(405).json({ message: "Method not allowed" })
}
