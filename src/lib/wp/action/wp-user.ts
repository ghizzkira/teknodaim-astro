import { wpHttp } from "./http"
import type { WpAuthorsDataProps } from "./wp-types"
import {
  QUERY_WP_ALL_USERS,
  QUERY_WP_USERS_BY_ID,
  QUERY_WP_USERS_BY_SLUG,
} from "@/lib/wp/data/wp-user"

import { wpHttp } from "./http"
import type { WpAuthorsDataProps } from "./wp-types"
import {
  QUERY_WP_ALL_USERS,
  QUERY_WP_USERS_BY_ID,
  QUERY_WP_USERS_BY_SLUG,
} from "@/lib/wp/data/wp-user"

export async function wpGetUserBySlugAction(slug: string) {
  const [res, err] = await wpHttp<{ data: { user: WpAuthorsDataProps } }>(
    QUERY_WP_USERS_BY_SLUG,
    {
      slug,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      user: null,
    }
  }

  return {
    err: null,
    user: res?.data?.user,
  }
}

export async function wpGetUserByNameSlugAction(slug: string) {
  const { users, err } = await wpGetAllUsersAction()

  const res = users?.find((user: { slug: string }) => user.slug === slug)

  if (err) {
    console.log(err)
    return {
      err,
      user: null,
    }
  }

  return {
    err: null,
    user: res,
  }
}

export async function wpGetUserbyIdAction(id: string) {
  const [res, err] = await wpHttp<{ data: { user: WpAuthorsDataProps } }>(
    QUERY_WP_USERS_BY_ID,
    {
      id,
    },
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      user: null,
    }
  }

  return {
    err: null,
    user: res?.data.user,
  }
}

export interface WpAuthorActionResponse {
  users: { edges: { node: WpAuthorsDataProps }[] }
}

export async function wpGetAllUsersAction() {
  const [res, err] = await wpHttp<{ data: WpAuthorActionResponse }>(
    QUERY_WP_ALL_USERS,
  )

  if (err) {
    console.log(err)
    return {
      err: err instanceof Error ? err.message : "An error occurred",
      users: null,
    }
  }

  const usersNode = res?.data.users.edges.map(
    ({ node = {} }) => node,
  ) as WpAuthorsDataProps[]

  return {
    err: null,
    users: usersNode?.map(wpMapUserData),
  }
}

export function wpMapUserData(user: WpAuthorsDataProps) {
  const data = {
    ...user,
    avatar: user.avatar && wpUpdateUserAvatar(user.avatar),
  }

  return {
    ...data,
  }
}

export function wpUpdateUserAvatar(avatar: { url: string }) {
  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://"),
  }
}
