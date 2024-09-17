import { NextApiRequest, NextApiResponse } from "next"
import getRestaurantByIDService from "../src/services/GetRestaurantByIDService"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await getRestaurantByIDService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
