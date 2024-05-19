import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteArticleComment } from "@/hooks/useArticleComment"
import { formatDate } from "@/lib/utils/date"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import type {
  SelectDownloadComment,
  SelectWpComment,
  SelectVideoEmbedComment,
  SelectArticleComment,
} from "@/lib/db/schema"
import { useDeleteDownloadComment } from "@/hooks/useDownloadComment"
import { useDeleteVideoEmbedComment } from "@/hooks/useVideoEmbedComment"
import { useDeleteWpComment } from "@/hooks/useWpComments"
import DashboardCommentShowOptions from "../DashboardCommentShowOptions"

interface DashboardCommentTableProps {
  comments:
    | SelectArticleComment[]
    | SelectDownloadComment[]
    | SelectWpComment[]
    | SelectVideoEmbedComment[]
  paramsName: string
  page: number
  lastPage: number
  type: string
  authorId: string
}

export default function DashboardCommentTable(
  props: DashboardCommentTableProps,
) {
  const { comments, paramsName, page, lastPage, type, authorId } = props

  const { handleDeleteComment: deleteArticleComment } = useDeleteArticleComment(
    {
      onSuccess: () => {
        toast({
          variant: "success",
          description: "comment has been deleted",
        })
        window.location.reload()
      },
      onError: () => {
        toast({
          description: "Error when deleting comment, try again",
          variant: "warning",
        })
      },
      byAdmin: true,
    },
  )

  const { handleDeleteComment: deleteDownloadComment } =
    useDeleteDownloadComment({
      onSuccess: () => {
        toast({
          variant: "success",
          description: "comment has been deleted",
        })
        window.location.reload()
      },
      onError: () => {
        toast({
          description: "Error when deleting comment, try again",
          variant: "warning",
        })
      },
      byAdmin: true,
    })

  const { handleDeleteComment: deleteVideoEmbedComment } =
    useDeleteVideoEmbedComment({
      onSuccess: () => {
        toast({
          variant: "success",
          description: "comment has been deleted",
        })
        window.location.reload()
      },
      onError: () => {
        toast({
          description: "Error when deleting comment, try again",
          variant: "warning",
        })
      },
      byAdmin: true,
    })

  const { handleDeleteComment: deleteWpComment } = useDeleteWpComment({
    onSuccess: () => {
      toast({
        variant: "success",
        description: "comment has been deleted",
      })
      window.location.reload()
    },
    onError: () => {
      toast({
        description: "Error when deleting comment, try again",
        variant: "warning",
      })
    },
    byAdmin: true,
  })

  const deleteCommentAction = async (type: string, data: { id: string }) => {
    if (type === "article") {
      await deleteArticleComment(data.id)
    } else if (type === "download") {
      await deleteDownloadComment(data.id)
    } else if (type === "video-embed") {
      await deleteVideoEmbedComment(data.id)
    } else if (type === "wp-post") {
      await deleteWpComment(data.id)
    }
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table className="table-fixed border-collapse border-spacing-0">
        <TableHeader>
          <TableRow>
            <TableHead>Content</TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Published Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => {
            return (
              <TableRow key={comment.id}>
                <TableCell className="max-w-[120px] align-middle">
                  <div className="flex">
                    <span className="line-clamp-3 overflow-hidden text-ellipsis font-medium">
                      {comment.content}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    {formatDate(comment.createdAt!, "LL")}
                  </div>
                </TableCell>
                <TableCell className="space-x-2 p-4 align-middle">
                  <DashboardCommentShowOptions
                    type={type}
                    comment={comment}
                    authorId={authorId}
                    onDelete={async () => {
                      await deleteCommentAction(type, comment)
                    }}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {lastPage ? (
        <DashboardPagination
          currentPage={page}
          lastPage={lastPage ?? 1}
          paramsName={paramsName}
        />
      ) : null}
    </div>
  )
}
