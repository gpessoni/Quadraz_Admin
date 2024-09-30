import { NextApiRequest, NextApiResponse } from "next"
import deleteRolesService from "../src/services/DeleteRolesService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteRolesService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
