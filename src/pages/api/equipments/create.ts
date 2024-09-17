import { NextApiRequest, NextApiResponse } from "next"
import createEquipmentsValidation from "./src/services/CreateEquipmentService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createEquipmentsValidation(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
