import { NextApiRequest, NextApiResponse } from "next"
import createRolesValidation from "./src/services/CreateRoleService"

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    req.method === "POST" ? await createRolesValidation(req, res) : res.status(405).json({ message: "Method not allowed" })
}

export default handlePost
