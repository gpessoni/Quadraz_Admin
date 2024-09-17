import { NextApiRequest, NextApiResponse } from "next"
import updateCourtService from "../src/services/UpdateCourtService"

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "PUT" ? await updateCourtService(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handleUpdate
