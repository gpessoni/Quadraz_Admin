import { NextApiRequest, NextApiResponse } from "next"
import deleteSportsCenterService from "../src/services/DeleteSportsCenterService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteSportsCenterService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
