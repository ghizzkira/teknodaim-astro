import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateSetting } from "@/hooks/useSetting"

interface FormValues {
  ads_txt: string
}

interface AdsTxtFormProps {
  settingValues?: FormValues
}

export function AdsTxtForm(props: AdsTxtFormProps) {
  const { settingValues } = props
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ defaultValues: settingValues })
  const { handleUpdateSetting: createSettingAction } = useUpdateSetting({
    onSuccess: (data) => {
      if (data) {
        toast({
          variant: "success",
          description: "Ads.txt has been updated",
        })
      }
    },
  })
  const onSubmit = (values: FormValues) => {
    setLoading(true)
    const keyValues = {
      key: "ads_txt",
      value: JSON.stringify(values),
    }
    createSettingAction(keyValues)

    setLoading(false)
  }

  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <h1>Ads.txt Settings</h1>
          <hr />
          <div>
            <label>ads.txt data</label>
            <Input
              type="text"
              {...register("ads_txt", {
                required: "ads.txt is Required",
              })}
              className="max-w-xl"
              placeholder="Enter ads.txt"
              required
            />
            {errors?.ads_txt && <p>{errors.ads_txt.message}</p>}
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
