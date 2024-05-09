// Relevant imports
import { NextResponse, NextRequest } from "next/server"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { client } from "@/utils/aws/client"

const POST = async (req: NextRequest) => {
  try {
    const { fileName, fileType, fileSize } = await req.json()
    if (!fileType || !fileName || !fileSize) {
      throw new Error("There was a problem with the file!")
    }

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: process.env.NEXT_AWS_PATH + "/" + fileName,
      ContentType: fileType,
      Bucket: process.env.NEXT_AWS_BUCKET_NAME,
      ACL: "public-read"
    })
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 })

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: process.env.NEXT_AWS_PATH + "/" + fileName,
      Bucket: process.env.NEXT_AWS_BUCKET_NAME
    })

    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 })

    return NextResponse.json({ putUrl, getUrl }, { status: 200 })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { POST }
