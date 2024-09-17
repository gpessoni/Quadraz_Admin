import { NextApiRequest, NextApiResponse } from "next"
import getPriceTableByCourtService from "./../../src/services/GetPriceTableByCourtService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "GET" ? await getPriceTableByCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
