import { NextApiRequest, NextApiResponse } from "next"
import getAllEquipmentsService from "./src/services/GetAllEquipmentsService"

export default async function Equipments(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getAllEquipmentsService(res) : res.status(405).json({ message: "Method not allowed" })
}
