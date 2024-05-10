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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import type { InsertUser } from "@/lib/db/schema"
import { useUpdateUser } from "@/hooks/useUser"
import Image from "../Image"
import { formatDate } from "@/lib/utils/date"
import TextEditor from "@/components/TextEditor/TextEditor"

interface FormValues {
  id: string
  username: string
  name: string
  phoneNumber?: string
  about?: string
  email?: string
  role: UserRole | string
}

interface EditUserFormProps {
  user: InsertUser
  currentUserRole: UserRole
}

export default function EditUserForm(props: EditUserFormProps) {
  const { user, currentUserRole } = props

  const [loading, setLoading] = React.useState<boolean>(false)

  const { handleUpdateUser: createUser } = useUpdateUser({
    onSuccess: () => {
      toast({ variant: "success", description: "Success updating user" })
    },
  })

  const form = useForm<FormValues>({
    defaultValues: {
      id: user.id,
      username: user.username!,
      name: user.name!,
      phoneNumber: user?.phoneNumber!,
      about: user?.about!,
      email: user?.email!,
      role: user?.role!,
    },
  })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    createUser(values, currentUserRole)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="px-2 lg:px-4">Edit user</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-2 lg:w-4/12">
          <div className="flex w-full flex-col items-center justify-center lg:flex-row">
            <div className="w-full lg:w-3/12">
              <Image
                src={user.image!}
                alt={user.name!}
                className="!relative h-16 w-16 rounded-full border-2 border-muted object-cover xl:!h-28 xl:!w-28"
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                width="100"
                height="100"
              />
            </div>
            <div className="w-full lg:w-9/12">
              <p className="text-base font-semibold lg:text-xl">{user.name}</p>
              <p className="text-xs lg:text-sm">{user.email}</p>
              <p className="text-xs lg:text-sm">
                Joined {formatDate(user.createdAt!, "LL")}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-2 lg:w-8/12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 rounded-sm border border-border p-5 lg:p-10"
            >
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "Name is required",
                  minLength: { value: 1, message: "Min 1 character" },
                  maxLength: { value: 64, message: "Max 64 characters" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Add name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                rules={{
                  required: "Username is required",
                  pattern: {
                    value: /^[a-z0-9]{3,16}$/i,
                    message:
                      "Username should be without spaces, symbol or any special characters.",
                  },
                  minLength: {
                    value: 3,
                    message: "Username should be minimum 3 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username should be maximum 20 characters.",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Add username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                rules={{
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Number is invalid",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Add phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                rules={{
                  required: "Role is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={currentUserRole !== "admin"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add placeholder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>About</FormLabel>
                <TextEditor control={form.control} name="about" />
                <Button aria-label="Sumbit" type="submit" loading={loading}>
                  Sumbit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
