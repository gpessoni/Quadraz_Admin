import { NextApiRequest, NextApiResponse } from "next"
import createLockerService from "./src/services/CreateLockerService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createLockerService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
