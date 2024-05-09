import s3 from "@/utils/aws/server"

export async function uploadToS3(file: any, name: string, fileType: string) {
  const params = {
    Bucket: process.env.NEXT_AWS_BUCKET_NAME || "",
    Key: process.env.NEXT_AWS_PATH + "/" + name,
    Body: file.get("file"),
    ACL: "public-read",
    ContentType: fileType
  }  

  const result = await s3.upload(params).promise()
  return result
}
