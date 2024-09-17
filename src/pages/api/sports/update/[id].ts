import { NextApiRequest, NextApiResponse } from "next"
import updateSportsService from "../src/services/UpdateSportsService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateSportsService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
