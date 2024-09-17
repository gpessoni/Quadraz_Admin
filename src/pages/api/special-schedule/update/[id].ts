import { NextApiRequest, NextApiResponse } from "next"
import updateSpecialScheduleService from "../src/services/UpdateSpecialScheduleService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateSpecialScheduleService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
