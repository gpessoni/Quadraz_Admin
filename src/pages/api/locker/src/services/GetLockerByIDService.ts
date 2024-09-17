import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/pages/api/config/prisma";
import { getLockerSchemaById } from "../validation/validation";
import { HttpStatus, sendErrorResponse } from "@/pages/api/config/http/httpUtilsList";

export default async function getLockerByIDService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = getLockerSchemaById.validate(req.query);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }

    const { id } = req.query;

    const Locker = await prisma.locker.findUnique({
      where: {
        id: id?.toString(),
      },
      include: {
        sportCenter: true,
      },
    });

    if (Locker) {
      return res.status(HttpStatus.SUCCESS).json(Locker);
    }

    return sendErrorResponse(res, HttpStatus.NOT_FOUND, "Locker not found");
  } catch (error) {
    return sendErrorResponse(res, HttpStatus.BAD_REQUEST, (error as Error).message);
  }
}
