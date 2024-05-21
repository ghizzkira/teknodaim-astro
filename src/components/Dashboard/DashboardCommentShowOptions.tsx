import * as React from "react"

import { AlertDelete } from "@/components/AlertDelete"
import { Button } from "@/components/UI/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu"
import { Icon } from "@/components/UI/Icon"
import { Dialog, DialogContent } from "@/components/UI/Dialog"
import EditArticleComment from "@/components/Comment/EditArticleComment"
import EditDownloadComment from "@/components/Comment/EditDownloadComment"
import EditVideoEmbedComment from "@/components/Comment/EditVideoEmbedComment"
import EditWpComment from "@/components/Comment/EditWpComment"

interface DashboardCommentShowOptionsProps {
  onDelete?: () => void
  description?: string
  type: string
  comment: { id: string; content: string }
  authorId: string
}

const DashboardCommentShowOptions: React.FC<
  DashboardCommentShowOptionsProps
> = (props) => {
  const { onDelete, comment, description, type, authorId } = props

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = React.useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-auto flex h-8">
            <Icon.MoreHorizontal className="mr-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px] p-2">
          {onDelete && (
            <>
              <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                <Icon.Delete className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem asChild>
            <div onClick={() => setOpenEditDialog(true)}>
              <Icon.Edit
                aria-label="Edit"
                className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-primary/90"
              />
              Edit
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {onDelete && (
        <AlertDelete
          description={description}
          isOpen={openDeleteDialog}
          className="max-w-[366px]"
          onDelete={onDelete}
          onClose={() => setOpenDeleteDialog(false)}
        />
      )}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="pt-10">
          {type === "wp-post" ? (
            <EditWpComment
              id={comment.id}
              type="dashboard"
              onSuccess={() => {
                window.location.reload()
              }}
              content={comment.content ?? ""}
              authorId={authorId}
              byAdmin={true}
            />
          ) : type === "article" ? (
            <EditArticleComment
              id={comment.id}
              type="dashboard"
              onSuccess={() => {
                window.location.reload()
              }}
              content={comment.content ?? ""}
              authorId={authorId}
              byAdmin={true}
            />
          ) : type === "download" ? (
            <EditDownloadComment
              id={comment.id}
              type="dashboard"
              onSuccess={() => {
                window.location.reload()
              }}
              content={comment.content ?? ""}
              authorId={authorId}
              byAdmin={true}
            />
          ) : type === "video-embed" ? (
            <EditVideoEmbedComment
              id={comment.id}
              type="dashboard"
              onSuccess={() => {
                window.location.reload()
              }}
              content={comment.content ?? ""}
              authorId={authorId}
              byAdmin={true}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DashboardCommentShowOptions
