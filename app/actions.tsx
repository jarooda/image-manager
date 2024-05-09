"use server"
import fs from "fs"

import { createClient } from "@/utils/supabase/server"
import { createAsset } from "@/lib/supabase"
import { uploadToS3 } from "@/lib/aws"
import { addHttps } from "@/lib/utils"

export async function saveAsset(asset: SaveAssetPayload) {
  const client = createClient()

  createAsset(asset, client)
}

export async function uploadAndSave({
  name,
  file,
  category,
  format,
  fileType
}: UploadAndSavePayload) {
  const fullPath = `${category}/${name}`
  file.append("fullPath", fullPath)
  file.append("fileType", fileType)

  // ? this is using API
  // const s3Result = await uploadFormDataToS3(file)

  // ? this is using server action
  const s3Result = await uploadToS3(file, fullPath, fileType)
  console.log(s3Result, ' ini s3Result');
  
  // const key = s3Result.Key
  // const asset: SaveAssetPayload = {
  //   url: addHttps(process.env.NEXT_AWS_BUCKET_NAME + "/" + key),
  //   category,
  //   format
  // }
  // saveAsset(asset)
}

// Function to upload FormData to S3
async function uploadFormDataToS3(
  formData: FormData
) {
  const response = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: formData
  })

  if (!response.ok) {
    throw new Error("Failed to upload file to S3")
  }
  return await response.json()
}
