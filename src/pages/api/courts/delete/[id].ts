import { NextApiRequest, NextApiResponse } from "next"
import deleteCourtService from "../src/services/DeleteCourtService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
