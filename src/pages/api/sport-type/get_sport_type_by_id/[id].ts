import { NextApiRequest, NextApiResponse } from "next"
import getSportTypesByIDService from "../src/services/GetSportTypeByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSportTypesByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
