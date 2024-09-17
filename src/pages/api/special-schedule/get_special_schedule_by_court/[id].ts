import { NextApiRequest, NextApiResponse } from "next"
import getSpecialScheduleByCourtService from "../src/services/GetSpecialScheduleByCourtService"

export default async function handleGetSpecialScheduleByCourtService(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSpecialScheduleByCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
