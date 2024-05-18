import * as React from "react"
import { useController } from "react-hook-form"

import { Button } from "@/components/UI/Button"

import { Icon } from "@/components/UI/Icon"
import { toast } from "@/components/UI/Toast/useToast"
import { wpGetCategoriesBySearchAction } from "@/lib/wp/action/wp-category"
import { FormLabel } from "@/components/UI/Form"
import { Input } from "@/components/UI/Input"
import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"

interface DashboardAddWpCategorySlugProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  fieldName: string
}

const DashboardAddWpCategorySlug: React.FunctionComponent<
  DashboardAddWpCategorySlugProps
> = (props) => {
  const { control, fieldName } = props

  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [liveResultsCategories, setLiveResultsCategories] = React.useState<
    WpCategoriesDataProps[]
  >([])

  const [selectedWpCategorySlug, setSelectedWpCategorySlug] = React.useState<{
    id: string
    name: string
    slug: string
  } | null>(null)

  const {
    field: { onChange, value: slugValue },
    formState: { errors },
  } = useController({
    control,
    name: fieldName,
  })

  const assignWpCategorySlug = React.useCallback(
    (slug: string | never, name: string) => {
      onChange(slug)
      setSelectedWpCategorySlug({ id: slug, name, slug })
    },
    [onChange],
  )

  React.useEffect(() => {
    const liveSearchPosts = async () => {
      if (searchQuery) {
        const { categories } = await wpGetCategoriesBySearchAction(searchQuery)
        if (Array.isArray(categories)) {
          setLiveResultsCategories(categories)
        }
      }
    }
    liveSearchPosts()
  }, [searchQuery])

  const onSubmit = React.useCallback(() => {
    if (liveResultsCategories) {
      const searchResult = liveResultsCategories?.find(
        (category) => category.name === searchQuery,
      )

      if (searchResult) {
        if (
          !selectedWpCategorySlug ||
          selectedWpCategorySlug.id !== searchResult.id
        ) {
          assignWpCategorySlug(searchResult.slug, searchResult.name)
        } else {
          toast({
            variant: "warning",
            description: searchQuery + " already selected!",
          })
        }
        setSearchQuery("")
      }
    }
  }, [selectedWpCategorySlug, assignWpCategorySlug, searchQuery])

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
    setSelectedWpCategorySlug(null)
    onChange("")
  }

  return (
    <div>
      <FormLabel>WP Category Slug</FormLabel>
      <div className="rounded-md border border-muted/30 bg-muted/100">
        <div className="parent-focus flex max-w-[300px] items-center p-2">
          <Input
            type="text"
            className="h-auto w-full min-w-[50px] max-w-full border-none !bg-transparent p-0 focus:border-none focus:ring-0"
            name="wpcategoryslug"
            onKeyDown={handleEnter}
            id="searchWpCategorySlug"
            value={searchQuery}
            placeholder="Find Wp Category"
            onChange={handleSearchChange}
          />
        </div>

        {searchQuery &&
        liveResultsCategories?.length &&
        liveResultsCategories?.length > 0 ? (
          <ul className="border-t border-muted/30">
            {liveResultsCategories?.map((searchWpCategorySlug) => (
              <li
                key={searchWpCategorySlug.id}
                className="p-2 hover:bg-muted/50"
              >
                <Button
                  variant="ghost"
                  type="button"
                  aria-label={searchWpCategorySlug.name}
                  onClick={() => {
                    assignWpCategorySlug(
                      searchWpCategorySlug.slug,
                      searchWpCategorySlug.name,
                    )
                    setSearchQuery("")
                  }}
                >
                  <div>
                    <h3 className="text-[18px]">{searchWpCategorySlug.name}</h3>
                    <h4 className="text-[14px]">{searchWpCategorySlug.slug}</h4>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery &&
          liveResultsCategories?.length &&
          liveResultsCategories?.length < 1 && (
            <div className="border-t border-muted/30 p-2">
              <p>Not Found</p>
            </div>
          )
        )}
      </div>
      <div>
        {slugValue && (
          <div className="flex items-center gap-2 bg-muted/20 px-2 py-1 text-[14px] text-foreground">
            <div className="flex flex-col gap-2">
              <span>{slugValue}</span>
            </div>
            <Button
              aria-label="Delete WpCategorySlug"
              onClick={handleRemoveValue}
              className="h-6 w-6 rounded-full bg-transparent p-0.5 text-foreground hover:bg-danger hover:text-white"
              size="icon"
            >
              <Icon.Close aria-label="Delete WpCategorySlug" />
            </Button>
          </div>
        )}
      </div>
      {errors?.wp_category_slug && (
        <p>{errors?.wp_category_slug?.message as unknown as string}</p>
      )}
    </div>
  )
}

export default DashboardAddWpCategorySlug
