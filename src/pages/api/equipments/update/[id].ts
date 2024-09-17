import { NextApiRequest, NextApiResponse } from "next"
import updateEquipmentsService from "../src/services/UpdateEquipmentsService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateEquipmentsService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
