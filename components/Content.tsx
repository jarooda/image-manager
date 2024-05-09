import ImageCard from "./ImageCard"
import PaginationWrapper from "./PaginationWrapper"
import ErrorLog from "./ErrorLog"

type ContentProps = {
  images: ImageAsset[]
  count: number
  query: QueryParams
}

export default function Content({ images, count, query }: ContentProps) {
  return (
    <main className=" p-4 flex flex-col justify-between h-full">
      {images.length === 0 ? (
        <ErrorLog message="No images found" />
      ) : (
        <div className=" flex flex-wrap gap-4">
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}

      <PaginationWrapper totalItems={count} currentPage={query.page} query={query} />
    </main>
  )
}
