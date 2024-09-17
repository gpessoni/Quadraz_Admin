import { NextApiRequest, NextApiResponse } from "next"
import deleteFloorService from "../src/services/DeleteFloorService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteFloorService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
