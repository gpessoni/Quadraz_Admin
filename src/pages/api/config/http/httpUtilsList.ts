import { NextApiResponse } from "next"

export const HttpStatus = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
}

export const sendErrorResponse = (res: NextApiResponse, status: number, errorMessage: string) => {
    return res.status(status).json({ error: errorMessage })
}
