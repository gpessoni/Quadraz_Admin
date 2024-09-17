import { NextApiRequest, NextApiResponse } from "next"
import createSportsCenterService from "./src/services/CreateSportsCenterService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createSportsCenterService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
