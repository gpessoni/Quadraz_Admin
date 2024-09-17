import { NextApiRequest, NextApiResponse } from "next"
import getEquipmentByIDService from "../src/services/GetEquipmentByIDService"

export default async function handleGetEquipmentByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getEquipmentByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
