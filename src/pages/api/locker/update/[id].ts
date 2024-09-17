import { NextApiRequest, NextApiResponse } from "next";
import updateLockerService from "../src/services/UpdateLockerService";

const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  req.method === "PUT"
    ? await updateLockerService(req, res)
    : res.status(405).json({ message: "Method not allowed" });
};

export default handleUpdate;
