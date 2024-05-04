import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Input"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateSetting } from "@/hooks/useSetting"

interface FormValues {
  query?: string
}

interface FilterPostFormProps {
  settingValues?: { queries: string[] }
}

export function FilterPostForm(props: FilterPostFormProps) {
  const { settingValues } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState("")
  const [stringArray, setStringArray] = React.useState<string[]>(
    settingValues?.queries ? settingValues?.queries : [],
  )
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.length > 1) {
        setStringArray((prevArray) => [...prevArray, inputValue])
        setInputValue("")
      } else {
        toast({ variant: "warning", description: "Query too short" })
      }
    }
  }
  const { register, handleSubmit } = useForm<FormValues>()

  const { handleUpdateSetting: createSettingAction } = useUpdateSetting({
    onSuccess: (data) => {
      if (data) {
        toast({
          variant: "success",
          description: "Filter post has been updated",
        })
        setInputValue("")
        window.location.reload()
      }
    },
  })
  const onSubmit = (values: FormValues) => {
    setLoading(true)
    if (stringArray.length === 0 && !values) {
      toast({ variant: "danger", description: "Query too short" })
    } else {
      const keyValues = {
        key: "filter_post",
        value: JSON.stringify({
          queries: values?.query
            ? [...stringArray, values.query]
            : [...stringArray],
        }),
      }
      createSettingAction(keyValues)
    }

    setLoading(false)
  }

  const handleItemClick = (index: number) => {
    setStringArray((prevArray) => {
      const newArray = [...prevArray]
      newArray.splice(index, 1)
      return newArray
    })
  }

  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <h1>Filter Post Settings</h1>
          <hr />
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <label>Query</label>
              <Input
                value={inputValue}
                type="text"
                {...register("query")}
                className="max-w-xl"
                placeholder="Press Enter to enter the query"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {stringArray.length < 1 && <p>{"Please enter query"}</p>}
            </div>
          </form>
          {stringArray && (
            <ul className="my-2 flex max-w-xl flex-wrap gap-2">
              {stringArray?.map((item, index) => (
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Delete Query"
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  {item}
                  <span className="ml-1">
                    <Icon.Delete aria-label="Delete Query" />
                  </span>
                </Button>
              ))}
            </ul>
          )}

          <Button
            aria-label="Submit"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
