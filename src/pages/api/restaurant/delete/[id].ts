import { NextApiRequest, NextApiResponse } from "next"
import deleteRestaurantService from "../src/services/DeleteRestaurantService"

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deleteRestaurantService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
