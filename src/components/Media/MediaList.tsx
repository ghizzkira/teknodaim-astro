import * as React from "react"

import LoadingProgress from "@/components/LoadingProgress"
import { toast } from "@/components/UI/Toast/useToast"
import CopyMediaLinkButton from "./CopyMediaLinkButton"
import DeleteMediaButton from "./DeleteMediaButton"
import { useDeleteMedia, useGetMediasInfinite } from "@/hooks/useMedia"
import Image from "@/components/Image"

interface MediaListProps extends React.HTMLAttributes<HTMLDivElement> {
  selectMedia?: (_media: { name: string; id: string; url: string }) => void
  isLibrary?: boolean
  deleteMedia?: () => void
  toggleUpload?: boolean
  onSelect?: () => void
}

const MediaList: React.FunctionComponent<MediaListProps> = (props) => {
  const { selectMedia, isLibrary, toggleUpload, onSelect } = props
  const prevToggleRef = React.useRef(toggleUpload)

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch: updateMedias,
  } = useGetMediasInfinite({ limit: 10 })
  React.useEffect(() => {
    if (prevToggleRef.current !== toggleUpload) {
      updateMedias()
    }

    prevToggleRef.current = toggleUpload
  }, [toggleUpload, updateMedias])

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && hasNextPage) {
        setTimeout(() => fetchNextPage(), 2)
      }
    },
    [fetchNextPage, hasNextPage],
  )

  React.useEffect(() => {
    const lmRef: HTMLDivElement | null = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, isLibrary, data])

  const { handleDeleteMedia: deleteMedia } = useDeleteMedia({
    onSuccess: () => {
      updateMedias()
      toast({ variant: "success", description: "Success deleting media" })
    },
  })

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-3 lg:grid-cols-6">
        {isLibrary
          ? data?.map((item) =>
              item?.medias.map((media) => {
                return (
                  <div
                    key={media.name}
                    className="relative overflow-hidden rounded-[18px]"
                  >
                    <DeleteMediaButton
                      description={media.name}
                      onDelete={() => deleteMedia(media.name)}
                    />
                    <CopyMediaLinkButton url={media.url} />
                    <a
                      aria-label={media.name}
                      href={`/dashboard/media/edit/${media.id}`}
                    >
                      <Image
                        key={media.id}
                        src={media.url}
                        alt={media.name}
                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                        className="!relative aspect-[1/1] !h-auto !w-full max-w-[unset] rounded-sm border-2 border-muted/30 bg-muted/30 object-cover"
                        width="400"
                        height="400"
                      />
                    </a>
                  </div>
                )
              }),
            )
          : data?.map((item, i) =>
              item?.medias.map((media) => {
                return (
                  <div
                    onClick={(
                      e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                    ) => {
                      e.preventDefault()
                      if (selectMedia) selectMedia(media)
                      if (onSelect) onSelect()
                    }}
                    key={i}
                  >
                    <Image
                      key={media.id}
                      src={media.url}
                      alt={media.name}
                      width="400"
                      height="400"
                      sizes="(max-width: 768px) 30vw,
                    (max-width: 1200px) 20vw,
                    33vw"
                      className="!relative aspect-[1/1] !h-auto !w-full max-w-[unset] cursor-pointer rounded-sm border-2 border-muted/30 bg-muted/30 object-cover"
                    />
                  </div>
                )
              }),
            )}
      </div>
      {hasNextPage && (
        <div ref={loadMoreRef}>
          <div className="text-center">
            <LoadingProgress />
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaList
