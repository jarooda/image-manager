import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

import { objectToQueryString } from "@/lib/utils"

type PaginationProps = {
  totalItems?: number
  itemsPerPage?: number
  currentPage?: number
  maxPaginationShown?: number
  query: QueryParams
}

type PaginationItem = number | "..."

export default function PaginationWrapper({
  totalItems = 1,
  itemsPerPage = 10,
  currentPage = 1,
  maxPaginationShown = 7,
  query
}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pageCount || pageCount === 0

  const getLists = (): PaginationItem[] => {
    if (pageCount <= 1) return [1]

    const getRange = (start: number, end: number): number[] =>
      Array(end - start + 1)
        .fill(0)
        .map((_, i) => i + start)

    let delta = 0

    if (pageCount <= maxPaginationShown) delta = maxPaginationShown
    else delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4

    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2)
    }

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1
      range.end += 1
    }

    let pages: PaginationItem[] =
      currentPage > delta
        ? getRange(
            Math.min(range.start, pageCount - delta),
            Math.min(range.end, pageCount)
          )
        : getRange(1, Math.min(pageCount, delta + 1))

    const withDots = (value: PaginationItem, pair: PaginationItem[]) =>
      pages.length + 1 !== pageCount ? pair : [value]

    if (pages[0] !== 1) pages = withDots(1, [1, "..."]).concat(pages)

    const lastPage = pages[pages.length - 1]
    if (typeof lastPage === "number" && lastPage < pageCount)
      pages = pages.concat(withDots(pageCount, ["...", pageCount]))

    return pages
  }
  const lists = getLists()

  const getLink = (page: number): string => {
    const newQuery = {
      ...query,
      page
    }
    return `?${objectToQueryString(newQuery)}`
  }

  return (
    <Pagination>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious href={getLink(currentPage - 1)} />
          </PaginationItem>
        )}
        {lists.map((item, index) => {
          return (
            <PaginationItem key={index}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getLink(item)}
                  isActive={item === currentPage}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          )
        })}
        {!isLastPage && (
          <PaginationItem>
            <PaginationNext href={getLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
