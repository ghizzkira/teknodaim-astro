import * as React from "react"

//  import type { User as UserProps } from "@prisma/client"

import Image from "@/components/Image"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"

// type UserDataProps = Pick<UserProps, "name" | "username" | "image">

interface UserCardSearchProps {
  locale: LanguageType
  user: any
}

const UserCardSearch: React.FunctionComponent<UserCardSearchProps> = (
  props,
) => {
  const { locale, user } = props

  const { name, username, image } = user

  return (
    <a
      aria-label={username}
      href={
        locale === "id"
          ? `${import.meta.env.PUBLIC_SITE_URL}/user/${username}`
          : `${import.meta.env.PUBLIC_EN_SITE_URL}/user/${username}`
      }
      className="mb-2 w-full"
    >
      <div className="flex flex-row hover:bg-accent">
        <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden rounded-md">
          {image ? (
            <Image
              src={image}
              className="object-cover"
              alt={name!}
              width={"50"}
              height={"50"}
            />
          ) : (
            <Icon.User aria-label="User Image" />
          )}
        </div>
        <div className="ml-2 w-3/4">
          <h3 className="mb-2 text-lg font-medium">{name}</h3>
        </div>
      </div>
    </a>
  )
}

export default UserCardSearch
