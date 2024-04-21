"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/form/input"
import { InputLeftElement } from "@/components/ui/form/input-element"
import { InputGroup } from "@/components/ui/form/input-group"
import { Icon } from "@/components/ui/icon"

interface DownloadSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (_query: string) => void
}

const DownloadSearch: React.FunctionComponent<DownloadSearchProps> = (
  props,
) => {
  const { onSearch } = props

  const [query, setQuery] = React.useState<string>("")

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSearch) {
      onSearch(query)
    } else {
      router.push(`/download/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <InputGroup>
          <InputLeftElement className="text-foreground">
            <Button aria-label="Search Download" type="button" variant={null}>
              <Icon.Search aria-label="Search" />
            </Button>
          </InputLeftElement>
          <Input
            type="search"
            name="q"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Search..."
          />
        </InputGroup>
      </form>
    </div>
  )
}

export default DownloadSearch
