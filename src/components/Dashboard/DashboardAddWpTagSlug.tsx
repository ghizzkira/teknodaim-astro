import * as React from "react"
import { useController } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { Icon } from "@/components/UI/Icon"
import { toast } from "@/components/UI/Toast/useToast"
import { wpGetTagsBySearchAction } from "@/lib/wp/action/wp-tag"
import { FormLabel } from "../UI/Form"
import type { WpTagsDataProps } from "@/lib/wp/action/wp-types"

interface DashboardAddWpTagSlugProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  fieldName: string
}

const DashboardAddWpTagSlug: React.FunctionComponent<
  DashboardAddWpTagSlugProps
> = (props) => {
  const { control, fieldName } = props

  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [selectedWpTagSlug, setSelectedWpTagSlug] = React.useState<{
    id: string
    name: string
    slug: string
  } | null>(null)
  const [liveResultsTags, setLiveResultsTags] = React.useState<
    WpTagsDataProps[]
  >([])

  const {
    field: { onChange, value: slugValue },
    formState: { errors },
  } = useController({
    control,
    name: fieldName,
  })

  const assignWpTagSlug = React.useCallback(
    (slug: string | never, name: string) => {
      onChange(slug)
      setSelectedWpTagSlug({ id: slug, name, slug })
    },
    [onChange],
  )
  React.useEffect(() => {
    const liveSearchPosts = async () => {
      if (searchQuery) {
        const { tags } = await wpGetTagsBySearchAction(searchQuery)
        if (Array.isArray(tags)) {
          setLiveResultsTags(tags)
        }
      }
    }
    liveSearchPosts()
  }, [searchQuery])

  const onSubmit = React.useCallback(() => {
    if (liveResultsTags) {
      const searchResult = liveResultsTags?.find(
        (tag) => tag.name === searchQuery,
      )

      if (searchResult) {
        if (!selectedWpTagSlug || selectedWpTagSlug.id !== searchResult.id) {
          assignWpTagSlug(searchResult.slug, searchResult.name)
        } else {
          toast({
            variant: "warning",
            description: searchQuery + " already selected!",
          })
        }
        setSearchQuery("")
      }
    }
  }, [selectedWpTagSlug, assignWpTagSlug, searchQuery])

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      setTimeout(onSubmit, 500)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const handleRemoveValue = () => {
    setSelectedWpTagSlug(null)
    onChange("")
  }

  return (
    <div>
      <FormLabel>WP Tag Slug</FormLabel>
      <div className="rounded-md border border-muted/30 bg-muted/100">
        <div className="parent-focus flex max-w-[300px] items-center p-2">
          <Input
            type="text"
            className="h-auto w-full min-w-[50px] max-w-full border-none !bg-transparent p-0 focus:border-none focus:ring-0"
            name="wptagslug"
            onKeyDown={handleEnter}
            id="searchWpTagSlug"
            value={searchQuery}
            placeholder="Find Wp Tag"
            onChange={handleSearchChange}
          />
        </div>

        {searchQuery &&
        liveResultsTags?.length &&
        liveResultsTags?.length > 0 ? (
          <ul className="border-t border-muted/30">
            {liveResultsTags?.map((searchWpTagSlug) => (
              <li key={searchWpTagSlug.id} className="p-2 hover:bg-muted/50">
                <Button
                  variant="ghost"
                  type="button"
                  aria-label={searchWpTagSlug.name}
                  onClick={() => {
                    assignWpTagSlug(searchWpTagSlug.slug, searchWpTagSlug.name)
                    setSearchQuery("")
                  }}
                >
                  <div>
                    <h3 className="text-[18px]">{searchWpTagSlug.name}</h3>
                    <h4 className="text-[14px]">{searchWpTagSlug.slug}</h4>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery &&
          liveResultsTags?.length &&
          liveResultsTags?.length < 1 && (
            <div className="border-t border-muted/30 p-2">
              <p>Not Found</p>
            </div>
          )
        )}
      </div>
      <div>
        {slugValue && (
          <div className="mt-2 flex items-center gap-2 bg-muted/20 px-2 py-1 text-[14px] text-foreground">
            <div className="flex flex-col gap-2">
              <span>{slugValue}</span>
            </div>
            <Button
              aria-label="Delete WpTagSlug"
              onClick={handleRemoveValue}
              className="h-6 w-6 rounded-full bg-transparent p-0.5 text-foreground hover:bg-danger hover:text-white"
              size="icon"
            >
              <Icon.Close aria-label="Delete WpTagSlug" />
            </Button>
          </div>
        )}
      </div>
      {errors?.wp_tag_slug && (
        <p>{errors?.wp_tag_slug?.message as unknown as string}</p>
      )}
    </div>
  )
}

export default DashboardAddWpTagSlug
