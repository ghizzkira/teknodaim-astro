import * as React from "react"

import { useForm } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Input"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useDisclosure } from "@/hooks/useDisclosure"
import { useCreateGadget } from "@/hooks/useGadget"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import TextEditorExtended from "@/components/TextEditor/TextEditorExtended"

import { type CreateGadget } from "@/lib/validation/gadget"
import DashboardAddWpCategorySlug from "../DashboardAddWpCategorySlug"
import DashboardAddWpTagSlug from "../DashboardAddWpTagSlug"
import { Switch } from "@/components/UI/Switch"

type FormValues = CreateGadget

const CreateGadgetForm: React.FunctionComponent = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [showMetaData, setShowMetaData] = React.useState<boolean>(false)
  const [clearContent, setClearContent] = React.useState<boolean>(false)
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")

  const { isOpen: isOpenSidebar, onToggle: onToggleSidebar } = useDisclosure()

  const form = useForm<FormValues>()

  const { handleCreateGadget: createGadget } = useCreateGadget({
    onSuccess: () => {
      form.reset()
      setClearContent((prev) => !prev)
      setSelectedFeaturedImageUrl("")
      toast({
        variant: "success",
        description: "Create success",
      })
      window.location.replace("/dashboard/gadget")
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Create failed",
      })
    },
  })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    if (!values.wpCategorySlug && !values.wpTagSlug) {
      toast({
        variant: "danger",
        description:
          "Error: Either wp category slug or wp tag slug must exist before mutation.",
      })
      setLoading(false)
      return
    }
    const mergedValues = {
      ...values,
      featuredImageId: selectedFeaturedImageId,
    }
    createGadget(mergedValues)
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    setOpenDialog(false)
    toast({
      variant: "success",
      description: "Featured image has been selected",
    })
  }

  const handleDeleteFeaturedImage = () => {
    setSelectedFeaturedImageId("")
    setSelectedFeaturedImageUrl("")
    toast({
      variant: "success",
      description: "Featured image has been deleted",
    })
  }

  return (
    <div className="flex w-full flex-col">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="space-y-4"
        >
          <div className="sticky top-0 z-20 w-full">
            <div className="flex items-center justify-between bg-background px-3 py-5">
              <Button aria-label="Back To Gadgets" variant="ghost">
                <a
                  className="flex items-center"
                  aria-label="Back To Gadgets"
                  href="/dashboard/gadget"
                >
                  <Icon.ChevronLeft aria-label="gadgets" />
                  Gadgets
                </a>
              </Button>
              <div>
                <Button
                  aria-label="save as draft"
                  type="submit"
                  onClick={() => {
                    form.setValue("status", "draft")
                    form.handleSubmit(onSubmit)()
                  }}
                  variant="ghost"
                  loading={loading}
                >
                  Save as draft
                </Button>
                <Button
                  aria-label="submit"
                  type="submit"
                  onClick={() => {
                    form.setValue("status", "published")
                    form.handleSubmit(onSubmit)()
                  }}
                  variant="ghost"
                  loading={loading}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  aria-label="View Sidebar"
                  variant="ghost"
                  onClick={onToggleSidebar}
                >
                  <Icon.ViewSidebar />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex min-h-screen flex-row flex-wrap">
            <div className="order-1 mx-auto w-full break-all lg:w-10/12 lg:px-64">
              <div className="relative mt-4 flex items-center justify-center">
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{
                      required: "Title is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            onInput={(event) => {
                              const textarea = event.currentTarget
                              const currentFocus = document.activeElement
                              const totalHeight =
                                textarea.scrollHeight -
                                parseInt(
                                  getComputedStyle(textarea).paddingTop,
                                ) -
                                parseInt(
                                  getComputedStyle(textarea).paddingBottom,
                                )
                              textarea.style.height = totalHeight + "px"
                              if (textarea.value === "") {
                                textarea.style.height = "45px"
                                textarea.focus()
                              }
                              if (currentFocus === textarea) {
                                textarea.focus()
                              }
                            }}
                            variant="plain"
                            className="h-12 max-w-[80vw] resize-none overflow-hidden text-[40px] font-bold leading-10 md:max-w-[unset]"
                            placeholder="Enter title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TextEditorExtended
                    control={form.control}
                    name="description"
                    isClear={clearContent}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                isOpenSidebar == false
                  ? "hidden"
                  : "pt-15 relative z-20 mt-16 flex flex-row overflow-x-auto bg-background py-4 opacity-100"
              } `}
            >
              <div className="fixed bottom-[95px] right-0 top-[90px]">
                <div className="scrollbar-hide h-[calc(100vh-180px)] max-w-[300px] overflow-y-auto rounded border py-4 max-sm:max-w-full lg:w-[400px] lg:max-w-[400px]">
                  <div className="flex flex-col bg-background px-2 py-2">
                    <div className="my-2 flex flex-col space-y-4 px-4">
                      {selectedFeaturedImageUrl ? (
                        <div className="relative overflow-hidden rounded-[18px]">
                          <DeleteMediaButton
                            description="Featured Image"
                            onDelete={() => handleDeleteFeaturedImage()}
                          />
                          <SelectMediaDialog
                            handleSelectUpdateMedia={handleUpdateMedia}
                            open={openDialog}
                            setOpen={setOpenDialog}
                          >
                            <div className="relative aspect-video h-[150px] w-full cursor-pointer rounded-sm border-2 border-muted/30 lg:h-full lg:max-h-[400px]">
                              <Image
                                src={selectedFeaturedImageUrl}
                                className="rounded-lg object-cover"
                                width="300"
                                height="300"
                                alt="Featured image"
                                onClick={() => setOpenDialog(true)}
                                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                              />
                            </div>
                          </SelectMediaDialog>
                        </div>
                      ) : (
                        <SelectMediaDialog
                          handleSelectUpdateMedia={handleUpdateMedia}
                          open={openDialog}
                          setOpen={setOpenDialog}
                        >
                          <div
                            onClick={() => setOpenDialog(true)}
                            className="relative mr-auto flex aspect-video h-[150px] w-full cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground lg:h-full lg:max-h-[250px]"
                          >
                            <p>Featured image</p>
                          </div>
                        </SelectMediaDialog>
                      )}
                      <div className="max-w-xl">
                        <DashboardAddWpCategorySlug
                          fieldName="wpCategorySlug"
                          control={form.control}
                        />
                      </div>

                      <div className="max-w-xl">
                        <DashboardAddWpTagSlug
                          fieldName="wpTagSlug"
                          control={form.control}
                        />
                      </div>
                      <h2 className="text-lg">Network</h2>
                      <FormField
                        control={form.control}
                        name="networkTechnology"
                        rules={{
                          required: "Network technology is Required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Network Technology</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Network Technology"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <h2 className="text-lg">Launch</h2>
                      <FormField
                        control={form.control}
                        name="launchAnnounced"
                        rules={{
                          required: "Launch announced is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Announced</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Launch Announced"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="launchStatus"
                        rules={{
                          required: "Launch status is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Launch Status"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Body</h2>
                      <FormField
                        control={form.control}
                        name="bodyDimensions"
                        rules={{
                          required: "Body dimensions is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dimensions</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Dimensions"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bodyWeight"
                        rules={{
                          required: "Body weight is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Weight"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bodySimCard"
                        rules={{
                          required: "Body sim card is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SIM Card</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter SIM Card"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Display</h2>
                      <FormField
                        control={form.control}
                        name="displayType"
                        rules={{
                          required: "Type is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Type"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displaySize"
                        rules={{
                          required: "Size is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Size"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayResolution"
                        rules={{
                          required: "Resolution is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resolution</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Resolution"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Platform</h2>
                      <FormField
                        control={form.control}
                        name="platformOs"
                        rules={{
                          required: "OS is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OS</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter OS"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="platformChipset"
                        rules={{
                          required: "Chipset is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chipset</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Chipset"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="platformCpu"
                        rules={{
                          required: "CPU is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPU</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter CPU"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="platformGpu"
                        rules={{
                          required: "CPU is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPU</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter GPU"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Memory</h2>
                      <FormField
                        control={form.control}
                        name="memoryCardSlot"
                        rules={{
                          required: "Card Slot is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Slot</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Card Slot"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="memoryInternal"
                        rules={{
                          required: "Internal is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Internal</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Internal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Main Camera</h2>
                      <FormField
                        control={form.control}
                        name="mainCamera"
                        rules={{
                          required: "Camera is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Camera</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Camera"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mainCameraFeatures"
                        rules={{
                          required: "Features is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Features"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mainCameraVideo"
                        rules={{
                          required: "Video is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Video"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Selfie Camera</h2>
                      <FormField
                        control={form.control}
                        name="selfieCamera"
                        rules={{
                          required: "Camera is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Camera</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Camera"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="selfieCameraVideo"
                        rules={{
                          required: "Video is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Video"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Sound</h2>
                      <FormField
                        control={form.control}
                        name="soundLoudspeaker"
                        rules={{
                          required: "Loudspeaker is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loudspeaker</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Loudspeaker"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sound35mmJack"
                        rules={{
                          required: "3.5mm Jack is required",
                        }}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                3.5mm Jack
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(value: boolean) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <h2 className="text-lg">Communications</h2>
                      <FormField
                        control={form.control}
                        name="commsWlan"
                        rules={{
                          required: "WLAN is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WLAN</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter WLAN"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="commsPositioning"
                        rules={{
                          required: "Positioning is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Positioning</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Positioning"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="commsNfc"
                        rules={{
                          required: "NFC is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NFC</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter NFC"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="commsRadio"
                        rules={{
                          required: "Radio is required",
                        }}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Radio</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(value: boolean) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="commsUsb"
                        rules={{
                          required: "USB is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>USB</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter USB"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Features</h2>
                      <FormField
                        control={form.control}
                        name="featuresSensors"
                        rules={{
                          required: "Sensors is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sensors</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Sensors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h2 className="text-lg">Battery</h2>
                      <FormField
                        control={form.control}
                        name="batteryType"
                        rules={{
                          required: "Type is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Type"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="batteryCharging"
                        rules={{
                          required: "Charging is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Charging</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Charging"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <h2 className="text-lg">Misc</h2>
                      <FormField
                        control={form.control}
                        name="miscColors"
                        rules={{
                          required: "Colors is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Colors</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="miscModels"
                        rules={{
                          required: "Models is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Models</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Models"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="miscSar"
                        rules={{
                          required: "SAR is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SAR</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter SAR"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="miscSarEu"
                        rules={{
                          required: "SAR (EU) is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SAR (EU)</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter SAR (EU)"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="miscPrice"
                        rules={{
                          required: "Price is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                className="max-w-xl"
                                placeholder="Enter Price"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter excerpt"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="rouded-lg bg-muted p-3 lg:p-5">
                        <div className="flex justify-between">
                          <div className={showMetaData ? "pb-4" : "pb-0"}>
                            <span className="flex align-top text-base font-semibold">
                              Meta Data
                            </span>
                            <span className="text-xs">
                              Extra content search engine
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className="border-none p-0"
                            onClick={() => setShowMetaData(!showMetaData)}
                          >
                            {showMetaData ? (
                              <Icon.Close />
                            ) : (
                              <Icon.ChevronDown />
                            )}
                          </Button>
                        </div>
                        <div
                          className={showMetaData ? "flex flex-col" : "hidden"}
                        >
                          <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter meta title"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter meta description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateGadgetForm
