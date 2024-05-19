import React from "react"

import CommentTable from "./DashboardCommentTable"

import type {
  SelectArticleComment,
  SelectDownloadComment,
  SelectVideoEmbedComment,
  SelectWpComment,
} from "@/lib/db/schema"
import { Button } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"

interface DashboardCommentContentProps {
  page: number
  lastPage: number
  type: string
  authorId: string

  comments:
    | SelectArticleComment[]
    | SelectDownloadComment[]
    | SelectWpComment[]
    | SelectVideoEmbedComment[]
}

export default function DashboardCommentContent(
  props: DashboardCommentContentProps,
) {
  const { comments, lastPage, page, type, authorId } = props
  React.useEffect(() => {
    if (lastPage && page !== 1 && page > lastPage) {
      const currentUrl = new URL(window.location.href)
      const params = new URLSearchParams(currentUrl.searchParams)
      params.set("page", lastPage.toString())
      window.location.replace(`/dashboard/comment/?${params.toString()}`)
    }
  }, [lastPage, page])

  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Comments</DashboardHeading>
      </div>
      <div>
        <div className="inline-block space-x-2 rounded-md bg-muted p-1">
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              type === "article" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/comment/?type=article")
            }
          >
            Article
          </Button>
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              type === "download" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/comment/?type=download")
            }
          >
            Download
          </Button>
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              type === "wp-post" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/comment/?type=wp-post")
            }
          >
            Wp
          </Button>
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              type === "video-embed" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/comment/?type=video-embed")
            }
          >
            Video Embed
          </Button>
        </div>
        {comments !== undefined && comments.length > 0 ? (
          <CommentTable
            comments={comments ?? []}
            paramsName="page"
            page={page ? page : 1}
            lastPage={lastPage ?? 1}
            type={type}
            authorId={authorId}
          />
        ) : (
          <div className="my-64 flex items-center justify-center">
            <h3 className="text-center text-4xl font-bold">Not found</h3>
          </div>
        )}
      </div>
    </div>
  )
}
