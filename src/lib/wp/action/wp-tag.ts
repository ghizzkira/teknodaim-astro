import {
  QUERY_WP_ALL_TAGS,
  QUERY_WP_ALL_TAGS_SITEMAP,
  QUERY_WP_SEARCH_TAGS,
  QUERY_WP_TAG_BY_SLUG,
} from "@/lib/wp/data/wp-tag"
import { wpHttp } from "./http"
import type { WpGetAllTagsResponse, WpTagsDataProps } from "./wp-types"

export async function wpGetAllTagsAction() {
  const [res, err] = await wpHttp<{ data: WpGetAllTagsResponse }>(
    QUERY_WP_ALL_TAGS,
  )

  if (err) {
    console.log(err)

    return {
      err: err instanceof Error ? err.message : "An error occurred",
      tags: null,
    }
  }

  const tags = res?.data.tags.edges.map(
    ({ node = {} }) => node,
  ) as WpTagsDataProps[]

  return {
    tags: tags,
    err: null,
  }
}

export async function wpGetAllTagsSiteMap() {
  const [res, err] = await wpHttp<{ data: WpGetAllTagsResponse }>(
    QUERY_WP_ALL_TAGS_SITEMAP,
  )

  if (err) {
    console.log(err)

    return {
      err: err instanceof Error ? err.message : "An error occurred",
      tags: null,
    }
  }

  const tags = res?.data.tags.edges.map(
    ({ node = {} }) => node,
  ) as WpTagsDataProps[]

  return {
    tags: tags,
    err: null,
  }
}

export async function wpGetTagsBySearchAction(search: string | string[]) {
  const [res, err] = await wpHttp<{
    data: WpGetAllTagsResponse
  }>(QUERY_WP_SEARCH_TAGS, {
    search,
  })

  if (err) {
    console.log(err)

    return {
      err: err instanceof Error ? err.message : "An error occurred",
      tags: null,
    }
  }

  const tags = res?.data?.tags.edges.map(
    ({ node = {} }) => node,
  ) as WpTagsDataProps[]

  return {
    tags: tags,
    err: null,
  }
}

export async function wpGetTagBySlugAction(slug: string | undefined) {
  const [res, err] = await wpHttp<{ data: WpGetAllTagsResponse }>(
    QUERY_WP_TAG_BY_SLUG,
    {
      slug,
    },
  )

  if (err) {
    console.log(err)

    return {
      tag: null,
      otherLangTag: null,
      err: err instanceof Error ? err.message : "An error occurred",
    }
  }
  if (res?.data.tags.edges.length === 0) {
    return {
      tag: null,
      other_lang_tag: null,
      err: "Something Error",
    }
  }
  const tag = res?.data?.tags.edges.map(
    ({ node = {} }) => node,
  )[0] as unknown as WpTagsDataProps

  const translations = tag?.translations?.[0]

  return {
    tag: tag,
    otherLangTag: translations ?? null,
    err: null,
  }
}

export function wpMapTagData(tag = {}) {
  const data = { ...tag }
  return data
}
