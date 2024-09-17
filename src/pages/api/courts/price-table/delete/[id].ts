import { NextApiRequest, NextApiResponse } from "next"
import deletePriceTableService from "../../src/services/DeletePriceTableService"; 

export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    req.method === "DELETE" ? await deletePriceTableService(req, res) : res.status(405).json({ message: "Method not allowed" })
}
