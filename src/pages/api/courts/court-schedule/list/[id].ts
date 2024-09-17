import { NextApiRequest, NextApiResponse } from "next"
import getAllScheduleByCourtService from "./../../src/services/GetAllScheduleByCourtService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "GET" ? await getAllScheduleByCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
