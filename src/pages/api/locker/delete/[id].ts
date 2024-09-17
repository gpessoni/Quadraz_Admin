import { NextApiRequest, NextApiResponse } from "next"
import deleteLockerService from "../src/services/DeleteLockerService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteLockerService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
