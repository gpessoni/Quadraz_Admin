import { NextApiRequest, NextApiResponse } from "next"
import getRoleByIDService from "../src/services/GetRoleByIDService"

export default async function handleGetRoleByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getRoleByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
