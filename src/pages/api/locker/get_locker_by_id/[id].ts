import { NextApiRequest, NextApiResponse } from "next"
import getLockerByIDService from "../src/services/GetLockerByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getLockerByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
