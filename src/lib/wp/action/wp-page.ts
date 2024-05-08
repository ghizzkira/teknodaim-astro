import { QUERY_WP_PAGE_BY_URI } from "../data/wp-page"
import { wpHttp } from "./http"
import type { WPPage } from "./wp-types"

import { QUERY_WP_PAGE_BY_URI } from "../data/wp-page"
import { wpHttp } from "./http"
import type { WPPage } from "./wp-types"

export async function wpGetPageByUri(uri: string | undefined) {
  const [res, err] = await wpHttp<{ data: { page: WPPage } }>(
    QUERY_WP_PAGE_BY_URI,
    {
      id: uri,
    },
  )

  if (err) {
    console.log(err)

    return {
      page: null,
      other_lang_page: null,
      err: err instanceof Error ? err.message : "An error occurred",
    }
  }

  if (!res?.data.page) {
    return {
      page: null,
      other_lang_page: null,
      err: "Something Error",
    }
  }
  const page = res?.data?.page
  const translations = page?.translations
  return {
    page: page,
    other_lang_page: translations ?? null,
    err: null,
  }
}
