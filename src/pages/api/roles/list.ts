import { NextApiRequest, NextApiResponse } from "next"
import getAllRolesService from "./src/services/GetAllRolesService"

export default async function Roles(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getAllRolesService(res) : res.status(405).json({ message: "Method not allowed" })
}
