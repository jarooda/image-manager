import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const fetchAssets = async (payload: SearchAssetPayload) => {
  const { title } = payload

  const { data: assets } = await supabase
    .from("notes")
    .select()
    .like("title", `%${title}%`)
    .or('id.in.(4,5)')
    // .filter("id", "eq", 5)
  return assets
}

export const createAsset = async (title: string) => {
  const { data } = await supabase.from("notes").insert([{ title }])
  return data
}