import { NextApiRequest, NextApiResponse } from "next"
import updateSportEquipamentService from "../src/services/UpdateSportEquipamentService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateSportEquipamentService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
