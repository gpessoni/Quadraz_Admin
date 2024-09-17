import { NextApiRequest, NextApiResponse } from "next"
import createSportsService from "./src/services/CreateSportsService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createSportsService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
