import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"

import { Input } from "@/components/UI/Input"

import { toast } from "@/components/UI/Toast/useToast"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/UI/Form"

import { useUpdateUserExpertise } from "@/hooks/useUserExpertise"
import type { UpdateUserLink } from "@/lib/validation/user-link"

interface FormValues {
  id: string
  title: string
  url: string
}

interface EditUserLinkFormProps {
  userExpertise: UpdateUserLink
}

export default function EditUserLinkForm(props: EditUserLinkFormProps) {
  const { userExpertise } = props

  const [loading, setLoading] = React.useState<boolean>(false)

  const { handleUpdateUserExpertise: createUserExpertise } =
    useUpdateUserExpertise({
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Success updating user expertise",
        })
      },
      onError: () => {
        toast({
          description: "Error when updating user expertise, try again",
          variant: "warning",
        })
      },
    })

  const form = useForm<FormValues>({
    defaultValues: {
      id: userExpertise.id,
      title: userExpertise?.title ?? "",
      url: userExpertise?.url ?? "",
    },
  })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    createUserExpertise(values)
    setLoading(false)
  }

  return (
    <div className="mx-0 space-y-4 lg:mx-8 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="pb-2 lg:pb-5">Edit User Expertise</h1>
          <div className="flex max-w-2xl flex-col space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Add title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              rules={{
                required: "Url is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Add url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button aria-label="Submit" type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
