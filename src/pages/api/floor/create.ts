import { NextApiRequest, NextApiResponse } from "next"
import createFloorService from "./src/services/CreateFloorService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createFloorService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
