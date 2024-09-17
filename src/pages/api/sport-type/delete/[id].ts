import { NextApiRequest, NextApiResponse } from "next"
import deleteSportTypesService from "../src/services/DeleteSportTypeService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteSportTypesService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
