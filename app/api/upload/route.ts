import { NextResponse } from 'next/server'

import fs from "fs"
import s3 from "@/utils/aws/server"

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(req: Request, res: Response) {
  try {
    console.log(req.body, ' ini req');

    const formData = await req.formData()
    
    // Get file data from request body
    // const { fullPath, fileType } = req.body
    const fileData = formData.get('file')
    const fullPath = formData.get('fullPath')
    const fileType = formData.get('fileType')
    console.log(' guoblok');

    const fileStream = require('stream').Readable.from(fileData);
    
    // Upload file to S3
    const uploadParams = {
      Bucket: process.env.NEXT_AWS_BUCKET_NAME || "",
      Key: fullPath,
      Body: fileStream,
      ContentType: fileType
    }

    const data = await s3.upload(uploadParams).promise()

    console.log(data);
    
    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch (error) {
    console.error("Error uploading file to S3:", error)
    return NextResponse.json({ message: 'Failed to upload file to S3' }, { status: 400 })
    // res.status(500).json({ error: "Failed to upload file to S3" })
  }
}
