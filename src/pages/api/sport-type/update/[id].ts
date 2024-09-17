import { NextApiRequest, NextApiResponse } from "next"
import updateSportTypesService from "../src/services/UpdateSportTypeService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateSportTypesService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
