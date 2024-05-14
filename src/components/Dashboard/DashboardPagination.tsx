import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from "@/components/UI/Pagination"

interface DashboardPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  paramsName?: string
  lastPage: number
  onPageChange?: (_page: number) => void
}

const DashboardPagination: React.FunctionComponent<DashboardPaginationProps> = (
  props,
) => {
  const { currentPage, lastPage, paramsName = "page" } = props

  function updatePage(page: number) {
    const currentUrl = new URL(window.location.href)
    const params = new URLSearchParams(currentUrl?.searchParams.toString())
    params.set(paramsName, page.toString())
    window.location.replace(`?${params.toString()}`)
  }

  return (
    <>
      {lastPage > 1 && (
        <div>
          <Pagination>
            <PaginationContent>
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationPreviousButton
                    onClick={() => updatePage(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              <span>{`Page ${currentPage} of ${lastPage}`}</span>
              {currentPage !== lastPage && (
                <PaginationItem>
                  <PaginationNextButton
                    onClick={() => updatePage(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
}

export default DashboardPagination
