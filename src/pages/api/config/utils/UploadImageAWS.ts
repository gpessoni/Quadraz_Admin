import aws from "aws-sdk"
import mime from "mime-types"
import { v4 as uuidv4 } from "uuid"
import { NextApiRequest, NextApiResponse } from "next"

export default async function uploadImageAWS(imageBuffer: any, req: NextApiRequest, res: NextApiResponse) {
    let extension = req.body.avatar_url.charAt(0)

    switch (extension) {
        case "/":
            extension = "jpg"
            break
        case "i":
            extension = "png"
            break
        case "R":
            extension = "gif"
            break
        case "U":
            extension = "webp"
            break
        case "J":
            extension = "bmp"
            break
        case "4":
            extension = "tiff"
            break
        case "0":
            extension = "psd"
            break
        default:
            extension = "jpg"
            break
    }

    const fileName = uuidv4() + "." + extension

    const contentType = mime.lookup(extension)

    const s3 = new aws.S3({
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
        region: process.env.REGION,
        signatureVersion: "v4",
    })

    const uploadParams: any = {
        Bucket: process.env.S3_BUCKET + "/avatar",
        Key: fileName,
        Body: imageBuffer,
        ACL: "public-read",
        ContentType: contentType,
    }

    const uploadResult = await s3.upload(uploadParams).promise()
    const imageUrl = uploadResult.Location

    return imageUrl
}
