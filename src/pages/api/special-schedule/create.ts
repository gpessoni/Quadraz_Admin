import { NextApiRequest, NextApiResponse } from "next"
import createSpecialScheduleService from "./src/services/CreateSpecialScheduleService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createSpecialScheduleService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
