import { fetchAssets } from "@/lib/supabase"

export default async function Page() {
  const payload: SearchAssetPayload = {
    title: "ass",
    filter: {
      format: "markdown"
    }
  }
  const notes = await fetchAssets(payload)

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}