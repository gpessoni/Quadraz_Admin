import { NextApiRequest, NextApiResponse } from "next"
import updateRestaurantService from "../src/services/UpdateRestaurantService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateRestaurantService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
