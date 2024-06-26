type SearchAssetPayload = {
  search: string
  filter: {
    formats?: string[]
    category?: string
  }
  page?: number
  perPage?: number
}

type ImageAsset = {
  id: number
  url: string
  format: string
  category: string
}

type AssetResponse = {
  status: number
  data: ImageAsset[]
  count: number
  message: string
}

type QueryParams = {
  page?: number
  search?: string
  format?: string[]
  category?: string
}

type SaveAssetPayload = {
  url: string
  category?: string
  format: string
}
type UploadAndSavePayload = {
  file: File | any
  name: string
  category: string
  format: string
  fileType: string
}