"use server"

import { createClient } from "@/utils/supabase/server"
import { createAsset } from "@/lib/supabase"

import { addHttps } from "@/lib/utils"

export async function saveAsset(assets: SaveAssetPayload[]) {
  const client = createClient()

  createAsset(assets, client)
}

export async function uploadMedia(formData: any) {
  try {
    const file = formData.get("file")
    const fileName = formData.get("name")

    // POST request to backend route handler
    const BASE_URL = process.env.NEXT_BASE_URL
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName,
        fileType: file.type,
        fileSize: file.size
      })
    })

    // Response includes a putUrl for upload and a getUrl for displaying a preview
    const { putUrl, getUrl } = await res.json()

    // Request made to putUrl, media file included in body
    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: "PUT",
      headers: { "Content-Type": file.type }
    })

    const path = process.env.NEXT_AWS_PATH
      ? `${process.env.NEXT_AWS_PATH}/`
      : ""
    const imageUrl = addHttps(
      `${process.env.NEXT_AWS_BUCKET_NAME}/${path}${fileName}`
    )

    return { status: uploadResponse.ok, imageUrl }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function authorizeUser(password: string) {
  return password === process.env.NEXT_SECRET_CODE
}