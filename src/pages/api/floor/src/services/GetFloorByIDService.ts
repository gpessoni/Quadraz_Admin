import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/pages/api/config/prisma";
import { getFloorByIDValidation } from "../validation/validation";
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList";

export default async function getFloorByIDService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = getFloorByIDValidation.validate(req.query);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }

    const { id } = req.query;

    const floor = await prisma.floor.findUnique({
      where: {
        id: id?.toString(),
      },
    });

    if (floor) {
      return res.status(HttpStatus.SUCCESS).json(floor);
    }

    return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Floor not found");
  } catch (error) {
    return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message);
  }
}
