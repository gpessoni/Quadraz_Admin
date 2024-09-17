import { NextApiRequest, NextApiResponse } from "next"
import deleteSpecialScheduleService from "../src/services/DeleteSpecialScheduleService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteSpecialScheduleService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
