import { NextApiRequest, NextApiResponse } from "next"
import createPriceTableService from "./../src/services/CreatePriceTableService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createPriceTableService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
