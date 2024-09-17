import { NextApiRequest, NextApiResponse } from "next"
import createScheduleService from "./../src/services/CreateScheduleService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createScheduleService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
