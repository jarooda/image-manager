"use server"

import { createClient } from "@/utils/supabase/server"
import { createAsset } from "@/lib/supabase"

export async function saveAsset(asset: SaveAssetPayload) {
  const client = createClient()

  createAsset(asset, client)
}
