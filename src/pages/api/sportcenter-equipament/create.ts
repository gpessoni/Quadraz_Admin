import { NextApiRequest, NextApiResponse } from "next"
import createSportEquipamentService from "./src/services/CreateSportEquipamentService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createSportEquipamentService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
