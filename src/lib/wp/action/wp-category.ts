import { wpHttp } from "./http"
import type {
  WpCategoriesDataProps,
  WpCategoriesEdgesDataProps,
} from "./wp-types"
import {
  QUERY_WP_ALL_CATEGORIES,
  QUERY_WP_ALL_CATEGORIES_SITEMAP,
  QUERY_WP_CATEGORY_BY_SLUG,
  QUERY_WP_SEARCH_CATEGORIES,
} from "@/lib/wp/data/wp-category"

import { wpHttp } from "./http"
import type {
  WpCategoriesDataProps,
  WpCategoriesEdgesDataProps,
} from "./wp-types"
import {
  QUERY_WP_ALL_CATEGORIES,
  QUERY_WP_ALL_CATEGORIES_SITEMAP,
  QUERY_WP_CATEGORY_BY_SLUG,
  QUERY_WP_SEARCH_CATEGORIES,
} from "@/lib/wp/data/wp-category"

export async function wpGetAllCategoriesAction() {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>(QUERY_WP_ALL_CATEGORIES)

  if (err) {
    console.log(err)

    return {
      err: err instanceof Error ? err.message : "An error occurred",
      categories: null,
    }
  }

  const categories = res?.data?.categories.edges.map(
    ({ node = {} }) => node,
  ) as WpCategoriesDataProps[]

  return {
    categories: categories,
    err: null,
  }
}

export async function wpGetAllCategoriesSiteMapAction() {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>(QUERY_WP_ALL_CATEGORIES_SITEMAP)

  if (err) {
    console.log(err)

    return {
      categories: null,
      err: err instanceof Error ? err.message : "An error occurred",
    }
  }

  const categories = res?.data?.categories.edges.map(
    ({ node = {} }) => node,
  ) as unknown as WpCategoriesDataProps[]

  return {
    categories: categories,
    err: null,
  }
}

export async function wpGetCategoriesBySearchAction(
  search: string | string[],
  language = "ID",
) {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>(QUERY_WP_SEARCH_CATEGORIES, {
    search,
    language,
  })

  if (err) {
    console.log(err)

    return {
      err: err instanceof Error ? err.message : "An error occurred",
      categories: null,
    }
  }

  const categories = res?.data?.categories.edges.map(
    ({ node = {} }) => node,
  ) as WpCategoriesDataProps[]

  return {
    categories: categories,
    err: null,
  }
}

export async function wpGetCategoryBySlugAction(slug: string) {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>(QUERY_WP_CATEGORY_BY_SLUG, {
    slug,
  })

  if (err) {
    console.log(err)

    return {
      category: null,
      other_lang_category: null,
      err: err instanceof Error ? err.message : "An error occurred",
    }
  }
  if (res?.data.categories.edges.length === 0) {
    return {
      category: null,
      other_lang_category: null,
      err: "Something Error",
    }
  }
  const category = res?.data?.categories.edges.map(
    ({ node = {} }) => node,
  )[0] as unknown as WpCategoriesDataProps

  const translations = category?.translations[0]

  return {
    category: category,
    other_lang_category: translations ?? null,
    err: null,
  }
}

export async function wpGetCategoriesAction({ count }: { count: number }) {
  const { categories, err } = await wpGetAllCategoriesAction()

  if (err) {
    return {
      err,
      categories: null,
    }
  }

  return {
    categories: categories!.slice(0, count),
    err: null,
  }
}

export function wpMapCategoryData(category: string[]) {
  const data = { ...category }
  return data
}
