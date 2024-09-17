import { NextApiRequest, NextApiResponse } from "next";
import updateFloorService from "../src/services/UpdateFloorService";

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  req.method === "PUT"
    ? await updateFloorService(req, res)
    : res.status(405).json({ message: "Method not allowed" });
};

export default handleUpdate;
