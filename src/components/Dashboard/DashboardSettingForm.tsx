import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateSetting } from "@/hooks/useSetting"

interface FormValues {
  siteTitle: string
  siteTagline: string
  siteDescription: string
  siteMetaTitle: string
  siteMetaDescription: string
  email: string
  supportEmail: string
  facebookUsername: string
  twitterUsername: string
  instagramUsername: string
  tiktokUsername: string
  whatsappChannel: string
  whatsappNumber: string

  youtubeChannel: string
  pinterestUsername: string
}

interface SettingFormProps {
  settingValues?: FormValues
}

export function SettingForm(props: SettingFormProps) {
  const { settingValues } = props
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ defaultValues: settingValues })
  const { handleUpdateSetting: createSettingAction } = useUpdateSetting({
    onSuccess: (data) => {
      if (data) {
        toast({ variant: "success", description: "Settings has been updated" })
      }
    },
  })
  const onSubmit = (values: FormValues) => {
    setLoading(true)
    const keyValues = {
      key: "settings",
      value: JSON.stringify(values),
    }
    createSettingAction(keyValues)

    setLoading(false)
  }

  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <h1>Settings</h1>
          <hr />
          <div className="space-y-2">
            <label>Site Title</label>
            <Input
              type="text"
              {...register("siteTitle", {
                required: "Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Title"
              required
            />
            {errors?.siteTitle && <p>{errors.siteTitle.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Site Tagline</label>
            <Input
              type="text"
              {...register("siteTagline", {
                required: "Tagline is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Tagline Username"
            />
            {errors?.siteTagline && <p>{errors.siteTagline.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Site Description</label>
            <Textarea
              {...register("siteDescription", {
                required: "Description is Required",
              })}
              className="max-w-xl"
              placeholder="Description"
            />
            {errors?.siteDescription && <p>{errors.siteDescription.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Site Meta Title</label>
            <Input
              type="text"
              {...register("siteMetaTitle", {
                required: "Meta Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Title"
            />
            {errors?.siteMetaTitle && <p>{errors.siteMetaTitle.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Site Meta Description</label>
            <Textarea
              {...register("siteMetaDescription", {
                required: "Meta Description is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Description"
            />
            {errors?.siteMetaDescription && (
              <p>{errors.siteMetaDescription.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label>Email</label>
            <Input
              type="text"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email tidak valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Email"
            />
            {errors?.email && <p>{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Support Email</label>
            <Input
              type="text"
              {...register("supportEmail", {
                required: "Support Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Support Email is not valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Support Email"
            />
            {errors?.supportEmail && <p>{errors.supportEmail.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Whatsapp Number</label>
            <Input
              type="number"
              {...register("whatsappNumber", {
                required: "Whatsapp Number is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Whatsapp Number"
            />
            {errors?.whatsappNumber && <p>{errors.whatsappNumber.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Facebook Username</label>
            <Input
              type="text"
              {...register("facebookUsername", {
                required: "Facebook username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Facebook Username"
            />
            {errors?.facebookUsername && (
              <p>{errors.facebookUsername.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label>Twitter Username</label>
            <Input
              type="text"
              {...register("twitterUsername", {
                required: "Twitter username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Twitter Username"
            />
            {errors?.twitterUsername && <p>{errors.twitterUsername.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Instagram Username</label>
            <Input
              type="text"
              {...register("instagramUsername", {
                required: "Instagram username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Instagram Username"
            />
            {errors?.instagramUsername && (
              <p>{errors.instagramUsername.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label>Tiktok Username</label>
            <Input
              type="text"
              {...register("tiktokUsername", {
                required: "Tiktok username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Tiktok Username"
            />
            {errors?.tiktokUsername && <p>{errors.tiktokUsername.message}</p>}
          </div>
          <div className="space-y-2">
            <label>WhatsApp Channel</label>
            <Input
              type="text"
              {...register("whatsappChannel", {
                required: "WhatsApp Channel is Required",
              })}
              className="max-w-xl"
              placeholder="Enter WhatsApp Channel"
            />
            {errors?.whatsappChannel && <p>{errors.whatsappChannel.message}</p>}
          </div>
          <div className="space-y-2">
            <label>Pinterest Username</label>
            <Input
              type="text"
              {...register("pinterestUsername", {
                required: "Pinterest username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Pinterest Username"
            />
            {errors?.pinterestUsername && (
              <p>{errors.pinterestUsername.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label>Youtube Channel</label>
            <Input
              type="text"
              {...register("youtubeChannel", {
                required: "Youtube channel is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Youtube Channel"
            />
            {errors?.youtubeChannel && <p>{errors.youtubeChannel.message}</p>}
          </div>
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
