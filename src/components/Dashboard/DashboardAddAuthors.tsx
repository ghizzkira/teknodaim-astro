// TODO: handle arrow down , conncect to api
import { useGetUsersSearch } from "@/hooks/useUser"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "@/components/UI/Toast/useToast"
import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
import { FormLabel, FormMessage } from "@/components/UI/Form"
import { Input } from "@/components/UI/Input"

interface FormValues {
  name: string
}

interface DashboardAddAuthorsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  authors: string[]
  addAuthors: React.Dispatch<React.SetStateAction<string[]>>
  selectedAuthors: {
    id: string
    name: string
  }[]
  addSelectedAuthors: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        name: string
      }[]
    >
  >
}

const DashboardAddAuthors: React.FunctionComponent<DashboardAddAuthorsProps> = (
  props,
) => {
  const { authors, addAuthors, selectedAuthors, addSelectedAuthors } = props

  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const { data: searchResults } = useGetUsersSearch(searchQuery)

  const form = useForm<FormValues>({ mode: "all", reValidateMode: "onChange" })

  const assignAuthor = React.useCallback(
    (id: string) => {
      const checkedAuthors = [...authors]
      const index = checkedAuthors.indexOf(id)
      if (index === -1) {
        checkedAuthors.push(id)
      } else {
        checkedAuthors.splice(index, 1)
      }
      addAuthors(checkedAuthors)
    },
    [addAuthors, authors],
  )

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      setSearchQuery(values.name)
      if (searchResults) {
        const searchResult = searchResults?.find(
          (topic) => topic.name === values.name,
        )
        if (searchResult) {
          if (
            !selectedAuthors.some((author) => author.name === searchResult.name)
          ) {
            const resultValue = {
              id: searchResult.id,
              name: searchResult.name!,
            }
            assignAuthor(searchResult.id)
            addSelectedAuthors((prev) => [...prev, resultValue])
          }
          setSearchQuery("")
        }
      }
    },
    [addSelectedAuthors, assignAuthor, searchResults, selectedAuthors],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const handleSelectandAssign = (value: { id: string; name: string }) => {
    if (!selectedAuthors.some((author) => author.name === value.name)) {
      setSearchQuery("")
      assignAuthor(value.id)
      addSelectedAuthors((prev) => [...prev, value])
    } else {
      toast({
        variant: "danger",
        description: value.name + ` already used`,
      })
      setSearchQuery("")
    }
  }

  const handleEnter = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === "Enter") {
      form.setValue("name", searchQuery)
      event.preventDefault()
      form.handleSubmit(onSubmit)()
      setSearchQuery("")
    }
  }

  const handleRemoveValue = (value: { id: string }) => {
    const filteredResult = selectedAuthors.filter(
      (item) => item.id !== value.id,
    )

    const filteredData = authors.filter((item) => item !== value.id)
    addSelectedAuthors(filteredResult)
    addAuthors(filteredData)
  }

  return (
    <div className="my-2 flex max-w-xl flex-col space-y-2">
      <FormLabel>Authors</FormLabel>
      <div className="rounded-md border border-muted/30 bg-muted/100">
        <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
          {selectedAuthors.length > 0 &&
            selectedAuthors.map((author) => {
              return (
                <div
                  className="flex items-center gap-2 bg-muted/20 px-2 py-1 text-[14px] text-foreground"
                  key={author.id}
                >
                  <span>{author.name}</span>
                  <Button
                    disabled={selectedAuthors.length === 1}
                    aria-label="Delete Author"
                    onClick={() => handleRemoveValue(author)}
                    size="icon"
                    className="size-5 min-w-0 rounded-full bg-transparent text-foreground hover:bg-danger hover:text-white"
                  >
                    <Icon.Close aria-label="Delete Author" />
                  </Button>
                </div>
              )
            })}
          <Input
            type="text"
            {...form.register("name", {
              required: selectedAuthors.length === 0 && "Author is required",
            })}
            className="h-auto w-full min-w-[50px] max-w-full shrink grow basis-0 border-none !bg-transparent p-0 focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            name="name"
            id="searchAuthor"
            value={searchQuery}
            onKeyDown={handleEnter}
            placeholder="Find authors"
            onChange={handleSearchChange}
          />
          <FormMessage />
        </div>
        {searchQuery && searchResults && searchResults.length > 0 && (
          <ul className="border-t border-muted/30">
            {searchResults.map((searchAuthor) => {
              const authorsData = {
                id: searchAuthor.id,
                name: searchAuthor.name!,
              }
              return (
                <li key={searchAuthor.id} className="p-2 hover:bg-muted/50">
                  <Button
                    aria-label={searchAuthor.name ?? ""}
                    variant="ghost"
                    type="button"
                    onClick={() => handleSelectandAssign(authorsData)}
                  >
                    {searchAuthor.name}
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default DashboardAddAuthors
