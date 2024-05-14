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

import { useCreateUserExpertise } from "@/hooks/useUserExpertise"

interface FormValues {
  title: string
  url: string
}

export default function CreateUserExpertiseForm() {
  const [loading, setLoading] = React.useState<boolean>(false)

  const { handleCreateUserExpertise: createUserExpertise } =
    useCreateUserExpertise({
      onSuccess: () => {
        form.reset()
        window.location.replace(`/dashboard/user-expertise`)
        toast({
          variant: "success",
          description: "Success creating user expertise",
        })
      },
    })

  const form = useForm<FormValues>()

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    createUserExpertise(values)
    setLoading(false)
  }

  return (
    <div className="mx-0 space-y-4 lg:mx-8 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="pb-2 text-xl font-bold md:text-3xl lg:pb-5">
            Create User Expertise
          </h1>
          <div className="flex max-w-2xl flex-col space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title required",
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
                  <FormLabel>Title</FormLabel>
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
