import * as React from "react"
// import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Input"
import { InputRightElement } from "@/components/UI/InputElement"
import { InputGroup } from "@/components/UI/InputGroup"

import type { LanguageType } from "@/lib/validation/language"

interface SearchTopNavProps {
  locale: LanguageType
}

const SearchTopNav: React.FunctionComponent<SearchTopNavProps> = React.memo(
  () => {
    const [_searchQuery, setSearchQuery] = React.useState<string>("")
    const [searched, setSearched] = React.useState<boolean>(false)

    const [showSearchMobile, setShowSearchMobile] =
      React.useState<boolean>(false)

    // const { data: productsData, isSuccess } = api.setting.byKey.useQuery(
    //   "products",
    //   {
    //     enabled: !!searchQuery,
    //   },
    // )

    // React.useEffect(() => {
    //   if (isSuccess) {
    //     if (productsData) {
    //       const parsedData = JSON.parse(productsData.value)
    //       setProducts(parsedData)
    //     } else {
    //       SetIsProducts(true)
    //     }
    //   }
    // }, [isSuccess, productsData])

    // const { data: wpPostsData } = useQuery({
    //   queryKey: [searchQuery + "WP"],
    //   queryFn: () =>
    //     wpGetPostsBySearchAction(searchQuery, locale.toUpperCase()),
    //   enabled: !!searchQuery,
    // })

    // const { data: articles } = api.article.search.useQuery(
    //   {
    //     language: locale,
    //     search_query: searchQuery,
    //   },
    //   {
    //     enabled: !!searchQuery,
    //   },
    // )

    // const { data: topics } = api.topic.search.useQuery(
    //   {
    //     language: locale,
    //     search_query: searchQuery,
    //   },
    //   {
    //     enabled: !!searchQuery,
    //   },
    // )

    // const { data: downloads } = api.download.search.useQuery(
    //   {
    //     language: locale,
    //     search_query: searchQuery,
    //   },
    //   {
    //     enabled: !!searchQuery,
    //   },
    // )

    // const { data: videos } = api.videoEmbed.search.useQuery(searchQuery, {
    //   enabled: !!searchQuery,
    // })

    // const { data: users } = api.user.search.useQuery(searchQuery, {
    //   enabled: !!searchQuery,
    // })

    const handleSearch = (event: {
      target: { value: React.SetStateAction<string> }
    }) => {
      if (event.target.value.length > 3) {
        setSearched(true)
        setSearchQuery(event.target.value)
      } else if (searched && event.target.value.length < 3) {
        setSearched(false)
        setSearchQuery("")
      }
    }

    // const filteredList = products.filter((list) => {
    //   return list.brand.toLowerCase().includes(searchQuery.toLowerCase())
    // })

    const handleHideSearch = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".search")) {
        setShowSearchMobile(false)
        setSearched(false)
        setSearchQuery("")
      }
    }

    React.useEffect(() => {
      document.body.addEventListener("click", handleHideSearch)
      return () => {
        document.body.removeEventListener("click", handleHideSearch)
      }
    }, [showSearchMobile])

    return (
      <>
        <div className="search static">
          <div className="hidden md:block">
            <form
              className="bg-background"
              onSubmit={(e) => e.preventDefault()}
              autoComplete="off"
            >
              <InputGroup className="relative flex min-w-full bg-background lg:w-[400px]">
                <Input
                  type="text"
                  onChange={(e) => handleSearch(e)}
                  autoComplete="off"
                  placeholder="Search..."
                />
                <InputRightElement>
                  <Icon.Search aria-label="Search" />
                </InputRightElement>
              </InputGroup>
            </form>
            {/* {searched && searchQuery && (
              <div className="scrollbarhide scrollbar absolute left-0 top-[36px] my-2 max-h-[500px] w-full overflow-y-scroll rounded-md bg-background p-4 shadow-lg">
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Posts</h5>
                  <div className="flex flex-col space-y-4">
                    {articles &&
                      articles.length > 1 &&
                      articles.map((article) => {
                        return (
                          <ArticleCardSearch
                            key={article.slug}
                            article={article}
                            locale={locale}
                          />
                        )
                      })}
                    {wpPostsData?.posts && wpPostsData?.posts.length > 1
                      ? wpPostsData?.posts.map((post) => {
                          const newUri = splitUriWP(post.uri, post.slug)
                          const { primaryCategory } = wpPrimaryCategorySlug(
                            post.categories,
                          )
                          return (
                            <WpPostCardSearch
                              key={post.slug}
                              title={post.title}
                              url={newUri}
                              imgUrl={post.featuredImage?.sourceUrl}
                              categorySlug={primaryCategory?.slug!}
                              categoryName={primaryCategory?.name!}
                              date={post.date}
                            />
                          )
                        })
                      : wpPostsData?.posts &&
                        wpPostsData?.posts?.length === 1 &&
                        articles?.length === 1 && (
                          <>
                            <p>Posts not found</p>
                          </>
                        )}
                  </div>
                </div>
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Downloads</h5>
                  <div className="flex flex-col space-y-4">
                    {downloads && downloads.length > 1 ? (
                      downloads.map((download) => {
                        return (
                          <DownloadCardSearch
                            key={download.slug}
                            download={download}
                            locale={locale}
                          />
                        )
                      })
                    ) : (
                      <>
                        <p>Downloads not found</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Topics</h5>
                  <div className="flex flex-col space-y-4">
                    {topics && topics.length > 1 ? (
                      topics.map((topic) => {
                        return (
                          <TopicCardSearch
                            key={topic.slug}
                            locale={locale}
                            topic={topic}
                          />
                        )
                      })
                    ) : (
                      <>
                        <p>Topics not found</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Videos</h5>
                  <div className="flex flex-col space-y-4">
                    {videos && videos.length > 1 ? (
                      videos.map((video) => {
                        return (
                          <VideoEmbedCardSearch
                            key={video.slug}
                            locale={locale}
                            video_embed={video}
                          />
                        )
                      })
                    ) : (
                      <>
                        <p>Videos not found</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Top Up</h5>
                  <div className="flex flex-col space-y-4">
                    {filteredList ? (
                      filteredList.map((list) => {
                        return (
                          <ShopCardSearch
                            brand={list.brand}
                            imageUrl={list.thumbnail_image!}
                            key={list.brand}
                          />
                        )
                      })
                    ) : (
                      <p>Product not found</p>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <h5 className="mb-2 border-b">Users</h5>
                  <div className="flex flex-col space-y-4">
                    {users && users?.length > 1 ? (
                      users.map((user) => {
                        return (
                          <UserCardSearch
                            key={user.username}
                            locale={locale}
                            user={user}
                          />
                        )
                      })
                    ) : (
                      <>
                        <p>Users not found</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )} */}
          </div>
          <div className="block md:hidden">
            <Button
              aria-label="Search"
              variant="ghost"
              className="p-1"
              onClick={() => {
                setShowSearchMobile((prev) => !prev)
              }}
            >
              <Icon.Search className="h-[19px] w-[19px]" aria-label="Search" />
            </Button>
          </div>
          {showSearchMobile && (
            <div className="absolute right-[-15px] top-[50px] block w-[100vw] rounded-md bg-background p-5 shadow-lg md:hidden">
              <form
                className="bg-background"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
              >
                <InputGroup className="relative flex min-w-full bg-background lg:w-[400px]">
                  <Input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    autoComplete="off"
                    placeholder="Search..."
                  />
                  <InputRightElement>
                    <Icon.Search aria-label="Search" />
                  </InputRightElement>
                </InputGroup>
              </form>
              {/* {searched && searchQuery && (
                <div className="mt-3 max-h-[350px] overflow-y-scroll">
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Posts</h5>
                    <div className="flex flex-col space-y-4">
                      {articles &&
                        articles.length > 1 &&
                        articles.map((article) => {
                          return (
                            <ArticleCardSearch
                              key={article.slug}
                              article={article}
                              locale={locale}
                            />
                          )
                        })}
                      {wpPostsData?.posts && wpPostsData?.posts.length > 1
                        ? wpPostsData?.posts.map((post) => {
                            const newUri = splitUriWP(post.uri, post.slug)
                            const { primaryCategory } = wpPrimaryCategorySlug(
                              post.categories,
                            )
                            return (
                              <WpPostCardSearch
                                key={post.slug}
                                title={post.title}
                                url={newUri}
                                imgUrl={post.featuredImage?.sourceUrl}
                                categorySlug={primaryCategory?.slug!}
                                categoryName={primaryCategory?.name!}
                                date={post.date}
                              />
                            )
                          })
                        : wpPostsData?.posts &&
                          wpPostsData?.posts.length === 1 &&
                          articles?.length === 1 && (
                            <>
                              <p>Posts not found</p>
                            </>
                          )}
                    </div>
                  </div>
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Downloads</h5>
                    <div className="flex flex-col space-y-4">
                      {downloads && downloads.length > 1 ? (
                        downloads.map((download) => {
                          return (
                            <DownloadCardSearch
                              key={download.slug}
                              download={download}
                              locale={locale}
                            />
                          )
                        })
                      ) : (
                        <>
                          <p>Downloads not found</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Videos</h5>
                    <div className="flex flex-col space-y-4">
                      {videos && videos.length > 1 ? (
                        videos.map((video) => {
                          return (
                            <VideoEmbedCardSearch
                              key={video.slug}
                              locale={locale}
                              video_embed={video}
                            />
                          )
                        })
                      ) : (
                        <>
                          <p>Videos not found</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Topics</h5>
                    <div className="flex flex-col space-y-4">
                      {topics && topics.length > 1 ? (
                        topics.map((topic) => {
                          return (
                            <TopicCardSearch
                              key={topic.slug}
                              locale={locale}
                              topic={topic}
                            />
                          )
                        })
                      ) : (
                        <>
                          <p>Topics not found</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Top Up</h5>
                    {filteredList ? (
                      filteredList.map((list) => {
                        return (
                          <ShopCardSearch
                            brand={list.brand}
                            imageUrl={list.thumbnail_image!}
                            key={list.brand}
                          />
                        )
                      })
                    ) : (
                      <p>Product not found</p>
                    )}
                  </div>
                  <div className="mb-1">
                    <h5 className="mb-2 border-b">Users</h5>
                    <div className="flex flex-col space-y-4">
                      {users && users.length > 1 ? (
                        users.map((user) => {
                          return (
                            <UserCardSearch
                              key={user.username}
                              locale={locale}
                              user={user}
                            />
                          )
                        })
                      ) : (
                        <>
                          <p>Users not found</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
      </>
    )
  },
)
export default SearchTopNav
