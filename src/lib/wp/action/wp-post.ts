import {
  GET_INFINITE_SCROLL_POSTS,
  GET_TOTAL_POSTS,
  QUERY_POSTS_ALL_SLUG,
  QUERY_POSTS_PAGINATION,
  QUERY_POSTS_SITEMAP,
  QUERY_WP_ALL_POSTS,
  QUERY_WP_ALL_POSTS_LOAD_MORE,
  QUERY_WP_ALL_SLUG,
  QUERY_WP_POST_BY_SLUG,
  QUERY_WP_POSTS_BY_AUTHOR_SLUG,
  QUERY_WP_POSTS_BY_CATEGORY_ID,
  QUERY_WP_POSTS_BY_CATEGORY_SLUG,
  QUERY_WP_POSTS_BY_TAG_ID,
  QUERY_WP_POSTS_BY_TAG_SLUG,
  QUERY_WP_POSTS_FEED,
  QUERY_WP_POSTS_SLUG_BY_CATEGORY_ID,
  QUERY_WP_SEARCH_POSTS,
} from "@/lib/wp/data/wp-post"
import { wpHttp } from "./http"
import type {
  WpAuthorsDataProps,
  WpFeaturedImageDataProps,
  WPFeedPostsProps,
  WpGetAllPostsResponse,
  WpGetPostsSlugByCategorySlugResponse,
  WpMapPostDataProps,
  WpResPostProps,
  WpResPostsByTagProps,
  WpSinglePostDataProps,
} from "./wp-types"
import { wpUpdateUserAvatar } from "./wp-user"

export async function wpGetAllPostsAction(language = "ID") {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(QUERY_WP_ALL_POSTS, {
    language,
  })

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  let posts: WpMapPostDataProps[] = []

  if (res) {
    posts = res?.data?.posts?.edges.map(
      ({ node = {} }) => node,
    ) as WpMapPostDataProps[]
  }

  return {
    err: null,
    posts: posts?.map(wpMapPostData),
    pageInfo: res?.data?.posts?.pageInfo,
  }
}

export async function wpGetAllPostsSlugAction(language = "ID") {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(QUERY_POSTS_ALL_SLUG, {
    language,
  })

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  let posts: WpMapPostDataProps[] = []

  if (res) {
    posts = res?.data?.posts?.edges.map(
      ({ node = {} }) => node,
    ) as WpMapPostDataProps[]
  }

  return {
    err: null,
    posts: posts?.map(wpMapPostData),
    pageInfo: res?.data?.posts?.pageInfo,
  }
}

export async function wpGetPostsSitemapAction(
  offset = 1 as number,
  language = "ID",
) {
  let offsetValue

  if (offset >= 2) {
    offsetValue = (offset + 1) * 100
  } else {
    offsetValue = offset
  }

  const [res, err] = await wpHttp<WpGetAllPostsResponse>(QUERY_POSTS_SITEMAP, {
    offset: offsetValue,
    language,
  })
  if (err !== null) {
    console.log(err)

    return {
      posts: null,
    }
  }

  const posts = res?.data?.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  return {
    posts: posts,
  }
}

export async function wpGetAllPostsLoadMoreAction(after = "", language = "ID") {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_WP_ALL_POSTS_LOAD_MORE,
    {
      after,
      language,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    err: null,
    posts: posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetFeedPosts(language = "ID") {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(QUERY_WP_POSTS_FEED, {
    language,
  })

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
    }
  }

  let posts: WpMapPostDataProps[] = []

  if (res) {
    posts = res?.data?.posts?.edges.map(
      ({ node = {} }) => node,
    ) as WpMapPostDataProps[]
  }

  return {
    err: null,
    posts: posts?.map(wpMapPostData) as unknown as WPFeedPostsProps[],
  }
}

export async function wpGetAllSlugAction(): Promise<unknown> {
  const after = ""

  const [res, err] = await wpHttp<WpGetAllPostsResponse>(QUERY_WP_ALL_SLUG, {
    after,
  })

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      res: null,
    }
  }

  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    err: null,
    posts: posts.map(wpMapPostData),
  }
}

export async function wpGetTotalPosts(language = "ID") {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(GET_TOTAL_POSTS, {
    language,
  })
  if (err !== null) {
    console.log(err)

    return {
      totalPosts: null,
    }
  }

  return {
    totalPosts: res?.data.posts.pageInfo.offsetPagination.total!,
  }
}

export async function wpGetPostsBySearchAction(
  search: string | string[],
  language = "ID",
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_WP_SEARCH_POSTS,
    {
      search,
      language,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
    }
  }

  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    err: null,
    posts: posts.map(wpMapPostData),
  }
}

export async function wpGetPostsSlugByCategoryIdAction(
  categorySlug: string,
  after = "",
  language = "ID",
) {
  const [res, err] = await wpHttp<WpGetPostsSlugByCategorySlugResponse>(
    QUERY_WP_POSTS_SLUG_BY_CATEGORY_ID,
    {
      categorySlug,
      after,
      language,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data?.category?.posts?.edges?.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data?.category?.posts.pageInfo,
  }
}
export async function wpGetPostBySlugAction(slug: string) {
  const [res, err] = await wpHttp<WpResPostProps>(QUERY_WP_POST_BY_SLUG, {
    slug,
  })

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      post: null,
      other_lang_post: null,
    }
  }
  if (res?.error) {
    return {
      err: res?.error.message,
      post: null,
      other_lang_post: null,
    }
  }
  if (!res?.data?.post) {
    return {
      err: "something wrong",
      post: null,
      other_lang_post: null,
    }
  }
  const post = wpMapPostData((res as WpResPostProps).data.post)
  const translations = post?.translations

  return { err: null, post: post, other_lang_post: translations ?? null }
}

export async function wpGetPostsByAuthorSlugAction(
  slug: string | string[],
  after = "",
  language = "ID",
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_WP_POSTS_BY_AUTHOR_SLUG,
    {
      slug,
      after,
      language,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetPostsByCategorySlugAction(
  categoryId: string,
  after = "",
  language = "ID",
  notIn = "",
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_WP_POSTS_BY_CATEGORY_SLUG,
    {
      categoryId,
      after,
      language,
      notIn,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data?.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data?.posts.pageInfo,
  }
}

export async function wpGetPostsByCategoryIdAction(
  categoryId: string,
  after = "",
  language = "ID",
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_WP_POSTS_BY_CATEGORY_ID,
    {
      categoryId,
      after,
      language,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetPostsByTagSlugAction(id: string, after = "") {
  const [res, err] = await wpHttp<WpResPostsByTagProps>(
    QUERY_WP_POSTS_BY_TAG_SLUG,
    { id, after },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data.tag.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data.tag.posts.pageInfo,
  }
}

export async function wpGetPostsByTagIdAction(id: string, after = "") {
  const [res, err] = await wpHttp<WpResPostsByTagProps>(
    QUERY_WP_POSTS_BY_TAG_ID,
    { id, after },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const postsData = res?.data.tag.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]
  let posts
  if (Array.isArray(postsData)) {
    posts = postsData.map(wpMapPostData)
  }
  return {
    err: null,
    posts: posts,
    pageInfo: res?.data.tag.posts.pageInfo,
  }
}

export async function wpGetInfiniteScollArticlesAction(
  categoryIn: string,
  after: string,
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    GET_INFINITE_SCROLL_POSTS,
    {
      categoryIn,
      after,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    err: null,
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export function wpMapPostData(post: WpMapPostDataProps) {
  let authorNode
  let categoriesNode
  let featuredImageNode
  let tagsNode
  let contentNode
  let translationsNode
  if (post.author) {
    authorNode = {
      ...post.author.node,
    }
  }

  if (post.author?.avatar && authorNode) {
    authorNode.avatar = wpUpdateUserAvatar(post.author.avatar)
  }

  if (post.categories) {
    categoriesNode = post.categories.edges?.map(({ node }) => {
      return {
        ...node,
      }
    })
  }

  if (post.translations?.[0]) {
    const translationsNodes = post.translations[0]
    translationsNode = {
      ...translationsNodes,
      categories: translationsNodes.categories.edges?.map(({ node }) => {
        return {
          ...node,
        }
      }),
    }
  }

  if (post.tags) {
    tagsNode = post.tags.edges?.map(({ node }) => {
      return {
        ...node,
      }
    })
  }

  if (post.content) {
    contentNode = post.content
    const regexImg = new RegExp(
      `https://${import.meta.env.DOMAIN ?? ""}/wp-content`,
      "g",
    )
    contentNode = contentNode.replace(
      regexImg,
      `https://media.${import.meta.env.DOMAIN ?? ""}/wp-content`,
    )
  }

  if (post.featuredImage) {
    featuredImageNode = post.featuredImage.node as WpFeaturedImageDataProps
  }

  const data: WpSinglePostDataProps = {
    ...(post as unknown as WpSinglePostDataProps),
  }
  if (authorNode) {
    data.author = authorNode as WpAuthorsDataProps
  }
  if (contentNode) {
    data.content = contentNode as string
  }
  if (tagsNode) {
    data.tags = tagsNode
  }
  if (categoriesNode) {
    data.categories = categoriesNode
  }
  if (featuredImageNode) {
    data.featuredImage = featuredImageNode
  }
  if (translationsNode) {
    data.translations = translationsNode
  }
  return data
}

export async function wpGetPostsByOffsetPagination(
  categoryName: string,
  offset = 0,
  size = 10,
) {
  const [res, err] = await wpHttp<WpGetAllPostsResponse>(
    QUERY_POSTS_PAGINATION,
    { categoryName, offset, size },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      posts: null,
      pageInfo: null,
    }
  }

  let posts: WpMapPostDataProps[] = []

  if (res) {
    posts = res?.data?.posts?.edges.map(
      ({ node = {} }) => node,
    ) as WpMapPostDataProps[]
  }

  return {
    err: null,
    posts: posts?.map(wpMapPostData),
  }
}
