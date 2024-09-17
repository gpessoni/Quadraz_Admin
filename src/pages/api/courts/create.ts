import { NextApiRequest, NextApiResponse } from "next"
import createCourtService from "./src/services/CreateCourtService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
