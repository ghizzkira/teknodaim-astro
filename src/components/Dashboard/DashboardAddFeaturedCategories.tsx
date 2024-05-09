import * as React from "react"
import type { LanguageType } from "@/lib/validation/language"
import { wpGetCategoriesBySearchAction } from "@/lib/wp/action/wp-category"
import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"
import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { InputRightElement } from "@/components/UI/InputElement"
import { InputGroup } from "@/components/UI/InputGroup"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateSetting } from "@/hooks/useSetting"

interface DashboardAddFeaturedCategoriesProps {
  featuredCategories?: Record<string, WpCategoriesDataProps[]>
}

export function DashboardAddFeaturedCategories(
  props: DashboardAddFeaturedCategoriesProps,
) {
  const { featuredCategories } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<LanguageType>("id")
  const [selectedCategories, setSelectedCategories] = React.useState<
    WpCategoriesDataProps[] | []
  >(featuredCategories?.id ? featuredCategories?.id : [])
  const [selectedCategoriesEn, setSelectedCategoriesEn] = React.useState<
    WpCategoriesDataProps[] | []
  >(featuredCategories?.en ? featuredCategories?.en : [])
  const [liveResultsCategories, setLiveResultsCategories] = React.useState<
    WpCategoriesDataProps[]
  >([])

  const handleClick = (category: WpCategoriesDataProps) => {
    if (selectedLanguage === "id") {
      const isDuplicate = selectedCategories.some(
        (selectedPost) => selectedPost.slug === category.slug,
      )
      if (isDuplicate) {
        toast({
          description: "Category has been added",
          variant: "warning",
        })
      } else {
        setSelectedCategories([...selectedCategories, category])
      }
    } else {
      const isDuplicate = selectedCategoriesEn.some(
        (selectedPost) => selectedPost.slug === category.slug,
      )
      if (isDuplicate) {
        toast({
          description: "Category has been added",
          variant: "warning",
        })
      } else {
        setSelectedCategoriesEn([...selectedCategoriesEn, category])
      }
    }
    setInputValue("")
  }

  const { handleUpdateSetting: createSettingAction } = useUpdateSetting({
    onSuccess: () => {
      toast({ variant: "success", description: "Settings has been updated" })
      setLoading(false)
    },
  })

  const onSubmit = () => {
    setLoading(true)
    const keyValues = {
      key: "featured_categories",
      value: JSON.stringify({
        categories: {
          id: [...selectedCategories],
          en: [...selectedCategoriesEn],
        },
      }),
    }
    createSettingAction(keyValues)
  }

  React.useEffect(() => {
    const liveSearchPosts = async () => {
      if (inputValue) {
        const { categories } = await wpGetCategoriesBySearchAction(
          inputValue,
          selectedLanguage.toUpperCase(),
        )
        if (Array.isArray(categories)) {
          setLiveResultsCategories(categories)
        }
      }
    }
    liveSearchPosts()
  }, [inputValue, selectedLanguage])

  const handleItemClick = (index: number, languagePost: LanguageType) => {
    if (languagePost === "id") {
      setSelectedCategories((prevArray) => {
        const newArray = [...prevArray]
        newArray.splice(index, 1)
        return newArray
      })
    } else if (languagePost === "en") {
      setSelectedCategoriesEn((prevArray) => {
        const newArray = [...prevArray]
        newArray.splice(index, 1)
        return newArray
      })
    }
  }

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }
  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <h2 className="mb-10 text-[30px]">Add Featured Categories</h2>
          <div className="relative max-w-lg">
            <form
              className="bg-background"
              onSubmit={(e) => e.preventDefault()}
              autoComplete="off"
            >
              <div className="mb-4">
                <label className="mr-2">Language:</label>
                <select
                  value={selectedLanguage}
                  className="w-[120px] cursor-pointer appearance-none rounded border border-border bg-background p-2 leading-5 transition-all duration-150 ease-in"
                  onChange={(e) =>
                    setSelectedLanguage(e.target.value as LanguageType)
                  }
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <InputGroup className="relative flex min-w-full bg-background lg:w-[400px]">
                <Input
                  value={inputValue}
                  type="text"
                  onChange={(e) => handleSearch(e)}
                  autoComplete="off"
                  placeholder="Find categories"
                />
                <InputRightElement>
                  {inputValue.length > 2 && (
                    <Icon.Close
                      onClick={() => setInputValue("")}
                      aria-label="Remove Query"
                      className="mr-3 cursor-pointer"
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            </form>
            {inputValue && liveResultsCategories && (
              <div
                id="list-categories"
                className="my-2 w-full bg-background p-4"
              >
                <div className="mb-1">
                  <h2 className="mb-2 border-b text-[20px]">Categories</h2>
                  <div className="flex flex-col space-y-4">
                    {liveResultsCategories && liveResultsCategories.length > 0
                      ? liveResultsCategories.map((category) => {
                          return (
                            <div
                              className="flex flex-row justify-between"
                              key={category.slug}
                            >
                              <div>
                                <h3 className="text-[18px]">{category.name}</h3>
                                <h4 className="text-[14px]">{category.slug}</h4>
                              </div>

                              <Button
                                variant="outline"
                                className="cursor-pointer rounded-full"
                                onClick={() => handleClick(category)}
                              >
                                <Icon.Add />
                              </Button>
                            </div>
                          )
                        })
                      : liveResultsCategories &&
                        liveResultsCategories.length < 1 && (
                          <>
                            <p>Categories not found</p>
                          </>
                        )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3>Indonesia</h3>
            {selectedCategories.length > 0 ? (
              <ul className="my-2 flex max-w-xl flex-wrap gap-2">
                {selectedCategories?.map((item, index) => (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-left"
                    aria-label="Delete Query"
                    key={index}
                    onClick={() => handleItemClick(index, "id")}
                  >
                    {item.name}
                    <span className="ml-1">
                      <Icon.Delete aria-label="Delete Query" />
                    </span>
                  </Button>
                ))}
              </ul>
            ) : (
              <p>No selected feature categories</p>
            )}
            <h3>English</h3>
            {selectedCategoriesEn.length > 0 ? (
              <ul className="my-2 flex max-w-xl flex-wrap gap-2">
                {selectedCategoriesEn?.map((item, index) => (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-left"
                    aria-label="Delete Query"
                    key={index}
                    onClick={() => handleItemClick(index, "en")}
                  >
                    {item.name}
                    <span className="ml-1">
                      <Icon.Delete aria-label="Delete Query" />
                    </span>
                  </Button>
                ))}
              </ul>
            ) : (
              <p>No selected feature categories</p>
            )}
          </div>

          <Button aria-label="Submit" onClick={onSubmit} loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
