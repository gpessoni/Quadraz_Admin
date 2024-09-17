import { NextApiRequest, NextApiResponse } from "next"
import deleteEquipmentsService from "../src/services/DeleteEquipmentService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteEquipmentsService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
