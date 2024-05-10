import { Format } from "@/constants"
import { pageToRange } from "@/lib/utils"

export const fetchAssets = async (
  payload: SearchAssetPayload,
  client: any
): Promise<AssetResponse> => {
  const supabase = client

  const { search, filter, page = 1 } = payload
  const allFormats = Format.map((format) => format.key)
  const { formats, category = "" } = filter
  const ranges = pageToRange(page)

  const formatString =
    formats && formats.length > 0 ? formats.join(",") : allFormats.join(",")

  let result = {
    status: 500,
    data: [],
    count: 0,
    message: "Internal server error"
  }

  try {
    if (category) {
      const {
        data: assets,
        error,
        count
      } = await supabase
        .from("assets")
        .select("*", { count: "exact" })
        .order('id', { ascending: true })
        .like("url", `%${search}%`)
        .filter("category", "eq", category)
        .or(`format.in.(${formatString})`)
        .range(ranges[0], ranges[1])

      if (error) {
        throw {
          message: error.message
        }
      }

      result.status = 200
      result.data = assets
      result.count = count
    } else {
      const {
        data: assets,
        error,
        count
      } = await supabase
        .from("assets")
        .select("*", { count: "exact" })
        .order('id', { ascending: true })
        .like("url", `%${search}%`)
        .or(`format.in.(${formatString})`)
        .range(ranges[0], ranges[1])

      if (error) {
        throw {
          message: error.message
        }
      }

      result.status = 200
      result.data = assets
      result.count = count
    }
  } catch (error: any) {
    result.status = 400
    result.message = error.message
  }

  return result
}

export const createAsset = async (
  assets: SaveAssetPayload[],
  client: any
) => {
  const supabase = client

  const { data } = await supabase
    .from("assets")
    .insert(assets)

  return data
}
