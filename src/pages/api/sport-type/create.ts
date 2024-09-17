import { NextApiRequest, NextApiResponse } from "next"
import createSportTypeService from "./src/services/CreateSportTypeService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createSportTypeService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
