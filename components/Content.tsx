import ImageCard from "./ImageCard"
import PaginationWrapper from "./PaginationWrapper"
import ErrorLog from "./ErrorLog"

type ContentProps = {
  images: ImageAsset[]
  count: number
  query: QueryParams
  itemsPerPage: number
}

export default function Content({ images, count, query, itemsPerPage }: ContentProps) {
  return (
    <main className=" p-4 flex flex-col justify-between h-full">
      {images.length === 0 ? (
        <ErrorLog message="No images found" />
      ) : (
        <div className=" flex flex-wrap gap-4">
          {images.map((image, index) => (
            <ImageCard key={image.url} image={image} index={index} />
          ))}
        </div>
      )}

      <PaginationWrapper totalItems={count} currentPage={query.page} query={query} itemsPerPage={itemsPerPage} />
    </main>
  )
}
