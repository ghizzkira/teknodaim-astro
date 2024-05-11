import * as React from "react"

import { Input } from "@/components/UI/Input"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteMedia, useGetMediasSearch } from "@/hooks/useMedia"
import CopyMediaLinkButton from "@/components/Media/CopyMediaLinkButton"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import Image from "@/components/Image"
import MediaList from "@/components/Media/MediaList"
import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"

export default function DashboardMediaContent() {
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null)

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const { data: resultsMedias, refetch: updateMedias } = useGetMediasSearch(
    searchQuery ?? "",
  )

  const { handleDeleteMedia: deleteMedia } = useDeleteMedia({
    onSuccess: () => {
      updateMedias()
      toast({ variant: "success", description: "delete_success" })
    },
  })

  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Medias</DashboardHeading>
        <DashboardAddNew url="/dashboard/media/new" />
      </div>
      <div className="mt-4">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <Input
            type="text"
            className="w-full"
            onChange={handleSearchOnChange}
            placeholder="search"
          />
        </form>
      </div>
      {searchQuery && resultsMedias && resultsMedias.length > 0 ? (
        <div className="my-3">
          <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-8">
            {resultsMedias?.map((media) => (
              <div
                className="relative overflow-hidden rounded-[18px]"
                key={media.id}
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
                    width="100"
                    height="100"
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                    className="!relative aspect-[1/1] h-[500px] max-w-[unset] rounded-sm border-2 border-muted/30 bg-muted/30 object-cover"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        searchQuery && (
          <div className="my-64 flex items-center justify-center">
            <h2>Medias Not found</h2>
          </div>
        )
      )}
      {!searchQuery ? (
        <div className="my-3">{<MediaList isLibrary={true} />}</div>
      ) : (
        !searchQuery && (
          <div className="my-64 flex items-center justify-center">
            <h2 className="text-center font-bold">Medias Not found</h2>
          </div>
        )
      )}
    </div>
  )
}
