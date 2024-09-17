import { NextApiRequest, NextApiResponse } from "next"
import getSpecialScheduleBySportCenterService from "../src/services/GetSpecialScheduleBySportCenterService"

export default async function handleGetSpecialScheduleBySportCenterService(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getSpecialScheduleBySportCenterService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
