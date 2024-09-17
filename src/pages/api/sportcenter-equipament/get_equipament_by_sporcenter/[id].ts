import { NextApiRequest, NextApiResponse } from "next"
import getEquipamentBySportCenterService from "../src/services/GetEquipamentBySportCenterService"

export default async function handleGetEquipamentBySportCenterService(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getEquipamentBySportCenterService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
