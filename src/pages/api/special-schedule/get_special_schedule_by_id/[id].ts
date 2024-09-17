import { NextApiRequest, NextApiResponse } from "next"
import getSpecialSchedulesByIDService from "../src/services/GetSpecialScheduleByIDService"

export default async function handleGetSpecialScheduleByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSpecialSchedulesByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
