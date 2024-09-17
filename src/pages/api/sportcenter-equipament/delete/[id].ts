import { NextApiRequest, NextApiResponse } from "next"
import deleteSportEquipamentService from "../src/services/DeleteSportEquipamentService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteSportEquipamentService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
