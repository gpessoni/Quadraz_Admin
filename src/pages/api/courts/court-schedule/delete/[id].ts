import { NextApiRequest, NextApiResponse } from "next"
import deleteScheduleService from "../../src/services/DeleteScheduleService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteScheduleService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
