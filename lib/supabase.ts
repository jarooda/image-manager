import { createClient } from "@/utils/supabase/server"
import { Format } from "@/constants"
import { pageToRange } from "@/lib/utils"

export const fetchAssets = async (
  payload: SearchAssetPayload
): Promise<AssetResponse> => {
  const supabase = createClient()

  const { search, filter, page = 1 } = payload
  const allFormats = Format.map((format) => format.key)
  const { formats, category = "" } = filter
  const ranges = pageToRange(page)

  const formatString =
    formats && formats.length > 0 ? formats.join(",") : allFormats.join(",")

  const {
    data: assets,
    error,
    count
  } = await supabase
    .from("assets")
    .select("*", { count: "exact" })
    .like("url", `%${search}%`)
    .filter("category", "eq", category)
    .or(`format.in.(${formatString})`)
    .range(ranges[0], ranges[1])

  return {
    status: error ? 400 : 200,
    data: assets || [],
    count: count || 0,
    message: error?.message || ""
  }
}

export const createAsset = async (title: string) => {
  const supabase = createClient()

  const { data } = await supabase.from("assets").insert([{ title }])
  return data
}
