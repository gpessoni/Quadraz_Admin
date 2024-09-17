import aws from "aws-sdk"
import mime from "mime-types"

export default async function removeFileAWS(file: any, folder: string) {
    const s3 = new aws.S3({
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
        region: process.env.REGION,
        signatureVersion: "v4",
    })

    const deleteParams: any = {
        Bucket: process.env.S3_BUCKET + folder,
        Key: file,
    }

    const deleteResult = await s3.deleteObject(deleteParams).promise()

    return deleteResult
}