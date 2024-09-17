import { NextApiRequest, NextApiResponse } from "next"
import updateSportsCenterService from "../src/services/UpdateSportsCenterService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateSportsCenterService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
