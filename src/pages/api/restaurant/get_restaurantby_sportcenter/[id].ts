import { NextApiRequest, NextApiResponse } from "next"
import GetRestaurantBySportCenter from "../src/services/GetRestaurantBySportCenter"

export default async function handleGetSportByID(req: NextApiRequest, res: NextApiResponse) {
    req.method === "GET" ? await GetRestaurantBySportCenter(req, res) : res.status(405).json({ message: "Method not allowed" })
}
