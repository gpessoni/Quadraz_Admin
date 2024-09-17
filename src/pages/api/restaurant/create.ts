import { NextApiRequest, NextApiResponse } from "next"
import createRestaurantService from "./src/services/CreateRestaurantService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createRestaurantService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
