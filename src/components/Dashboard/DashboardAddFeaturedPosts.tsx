import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Input"
import { InputRightElement } from "@/components/UI/InputElement"
import { InputGroup } from "@/components/UI/InputGroup"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateSetting } from "@/hooks/useSetting"
import type { LanguageType } from "@/lib/validation/language"
import type { UpsertWpPopularPost } from "@/lib/validation/wp-popular-post"
import { wpGetPostsBySearchAction } from "@/lib/wp/action/wp-post"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import { wpPrimaryCategorySlug } from "@/lib/wp/helper"

interface DashboardAddFeaturedPostsProps {
  filteredQueries?: string[]
  featuredPosts?: Record<string, UpsertWpPopularPost[]>
}

export function DashboardAddFeaturedPosts(
  props: DashboardAddFeaturedPostsProps,
) {
  const { filteredQueries, featuredPosts } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<LanguageType>("id")
  const [selectedPosts, setSelectedPosts] = React.useState<
    UpsertWpPopularPost[] | []
  >(featuredPosts?.id ? featuredPosts?.id : [])
  const [selectedPostsEn, setSelectedPostsEn] = React.useState<
    UpsertWpPopularPost[] | []
  >(featuredPosts?.en ? featuredPosts?.en : [])
  const [liveResultsPosts, setLiveResultsPosts] = React.useState<
    WpSinglePostDataProps[]
  >([])
  const handleClick = (post: UpsertWpPopularPost) => {
    if (selectedLanguage === "id") {
      const isDuplicate = selectedPosts.some(
        (selectedPost) => selectedPost.slug === post.slug,
      )
      if (isDuplicate) {
        toast({
          description: "Post has been added",
          variant: "warning",
        })
      } else {
        setSelectedPosts([...selectedPosts, post])
      }
    } else {
      const isDuplicate = selectedPostsEn.some(
        (selectedPost) => selectedPost.slug === post.slug,
      )
      if (isDuplicate) {
        toast({
          description: "Post has been added",
          variant: "warning",
        })
      } else {
        setSelectedPostsEn([...selectedPostsEn, post])
      }
    }
    setInputValue("")
  }

  const { handleUpdateSetting: createSettingAction } = useUpdateSetting({
    onSuccess: () => {
      toast({ variant: "success", description: "Settings has been updated" })
    },
  })

  const onSubmit = () => {
    setLoading(true)
    if (selectedPosts.length < 4 || selectedPostsEn.length < 4) {
      toast({ variant: "danger", description: "Posts less than 4" })
    } else if (selectedPosts.length > 5 || selectedPostsEn.length > 5) {
      toast({ variant: "danger", description: "Posts more than 4" })
    } else {
      const keyValues = {
        key: "featured_posts",
        value: JSON.stringify({
          posts: {
            id: [...selectedPosts],
            en: [...selectedPostsEn],
          },
        }),
      }
      createSettingAction(keyValues)
    }

    setLoading(false)
  }

  React.useEffect(() => {
    const liveSearchPosts = async () => {
      if (inputValue) {
        const { posts } = await wpGetPostsBySearchAction(
          inputValue,
          selectedLanguage.toUpperCase(),
        )
        if (Array.isArray(posts)) {
          setLiveResultsPosts(posts)
        }
      }
    }
    liveSearchPosts()
  }, [inputValue, selectedLanguage])

  const handleItemClick = (index: number, languagePost: LanguageType) => {
    setInputValue("")
    if (languagePost === "id") {
      setSelectedPosts((prevArray) => {
        const newArray = [...prevArray]
        newArray.splice(index, 1)
        return newArray
      })
    } else if (languagePost === "en") {
      setSelectedPostsEn((prevArray) => {
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
          <h2 className="mb-10 text-[30px]">Add Featured Posts</h2>
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
                  placeholder="Find posts"
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
            {inputValue && liveResultsPosts && (
              <div id="list-posts" className="my-2 w-full bg-background p-4">
                <div className="mb-1">
                  <h2 className="mb-2 border-b text-[20px]">Posts</h2>
                  <div className="flex flex-col space-y-4">
                    {liveResultsPosts && liveResultsPosts.length > 0
                      ? liveResultsPosts.map((post) => {
                          const isWordIncluded = filteredQueries?.some((word) =>
                            post.title
                              .toLowerCase()
                              .includes(word.toLowerCase()),
                          )
                          if (isWordIncluded === true) {
                            return null
                          }
                          const { primaryCategory } = wpPrimaryCategorySlug(
                            post.categories,
                          )

                          return (
                            <div
                              className="flex cursor-pointer flex-row justify-between"
                              key={post.slug}
                            >
                              <h3 className="text-[18px]">{post.title}</h3>
                              <Button
                                variant="outline"
                                className="rounded-full"
                                onClick={() =>
                                  handleClick({
                                    title: post.title,
                                    slug: post.slug,
                                    excerpt: post.excerpt,
                                    publishedTime: new Date(
                                      post.date,
                                    ).toISOString(),
                                    thumbnail: post.featuredImage.sourceUrl,
                                    primaryCategory: primaryCategory?.name!,
                                    primaryCategorySlug: primaryCategory?.slug!,
                                    authorName: post.author.name,
                                    authorSlug: post.author.slug,
                                    language: selectedLanguage,
                                    authorImage: post.author.avatar.url,
                                  })
                                }
                              >
                                <Icon.Add />
                              </Button>
                            </div>
                          )
                        })
                      : liveResultsPosts &&
                        liveResultsPosts.length < 1 && (
                          <>
                            <p>Posts not found</p>
                          </>
                        )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3>Indonesia</h3>
            {selectedPosts.length > 0 ? (
              <ul className="my-2 flex max-w-xl flex-wrap gap-2">
                {selectedPosts?.map((item, index) => (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-left"
                    aria-label="Delete Query"
                    key={index}
                    onClick={() => handleItemClick(index, "id")}
                  >
                    {item.title}
                    <span className="ml-1">
                      <Icon.Delete aria-label="Delete Query" />
                    </span>
                  </Button>
                ))}
              </ul>
            ) : (
              <p>No selected feature posts</p>
            )}
            <h3>English</h3>
            {selectedPostsEn.length > 0 ? (
              <ul className="my-2 flex max-w-xl flex-wrap gap-2">
                {selectedPostsEn?.map((item, index) => (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-left"
                    aria-label="Delete Query"
                    key={index}
                    onClick={() => handleItemClick(index, "en")}
                  >
                    {item.title}
                    <span className="ml-1">
                      <Icon.Delete aria-label="Delete Query" />
                    </span>
                  </Button>
                ))}
              </ul>
            ) : (
              <p>No selected feature posts</p>
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
