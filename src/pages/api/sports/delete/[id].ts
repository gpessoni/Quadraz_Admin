import { NextApiRequest, NextApiResponse } from "next"
import deleteSportsService from "../src/services/DeleteSportsService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteSportsService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
