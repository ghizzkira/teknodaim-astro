import { STATUS_TYPE } from "./status"
import { z } from "zod"

import { STATUS_TYPE } from "./status"
import { z } from "zod"

export const gadgetInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3),
  excerpt: z
    .string({
      invalid_type_error: "Excerpt must be a string",
      required_error: "Excerpt is required",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .min(50),
  wpTagSlug: z
    .string({
      invalid_type_error: "Wp Tag Slug must be a string",
    })
    .optional(),
  wpCategorySlug: z
    .string({
      invalid_type_error: "Wp Category Slug must be a string",
    })
    .optional(),
  networkTechnology: z
    .string({
      invalid_type_error: "Network Technology must be a string",
    })
    .optional(),
  launchAnnounced: z
    .string({
      invalid_type_error: "Launch Announced must be a string",
    })
    .optional(),
  launchStatus: z
    .string({
      invalid_type_error: "Launch Status must be a string",
    })
    .optional(),
  bodyDimensions: z
    .string({
      invalid_type_error: "Body Dimensions must be a string",
    })
    .optional(),
  bodyWeight: z
    .string({
      invalid_type_error: "Body Weight must be a string",
    })
    .optional(),
  bodySimCard: z
    .string({
      invalid_type_error: "Body SIM Card must be a string",
    })
    .optional(),
  displayType: z
    .string({
      invalid_type_error: "Display Type must be a string",
    })
    .optional(),
  displaySize: z
    .string({
      invalid_type_error: "Display Size must be a string",
    })
    .optional(),
  displayResolution: z
    .string({
      invalid_type_error: "Display Resolution must be a string",
    })
    .optional(),
  platformOs: z
    .string({
      invalid_type_error: "Platform OS must be a string",
    })
    .optional(),
  platformChipset: z
    .string({
      invalid_type_error: "Platform Chipset must be a string",
    })
    .optional(),
  platformCpu: z
    .string({
      invalid_type_error: "Platform CPU must be a string",
    })
    .optional(),
  platformGpu: z
    .string({
      invalid_type_error: "Platform GPU must be a string",
    })
    .optional(),
  memoryCardSlot: z
    .string({
      invalid_type_error: "Memory Card Slot must be a string",
    })
    .optional(),
  memoryInternal: z
    .string({
      invalid_type_error: "Memory Internal must be a string",
    })
    .optional(),
  mainCamera: z
    .string({
      invalid_type_error: "Main Camera must be a string",
    })
    .optional(),
  mainCameraFeatures: z
    .string({
      invalid_type_error: "Main Camera Features must be a string",
    })
    .optional(),
  mainCameraVideo: z
    .string({
      invalid_type_error: "Main Camera Video must be a string",
    })
    .optional(),
  selfieCamera: z
    .string({
      invalid_type_error: "Selfie Camera must be a string",
    })
    .optional(),
  selfieCameraVideo: z
    .string({
      invalid_type_error: "Selfie Camera Video must be a string",
    })
    .optional(),
  soundLoudspeaker: z
    .string({
      invalid_type_error: "Sound Load Speaker must be a string",
    })
    .optional(),
  sound35mmJack: z
    .boolean({
      invalid_type_error: "Sound 3.5mm Jack must be a boolean",
    })
    .optional(),
  commsWlan: z
    .string({
      invalid_type_error: "Communications WLAN must be a string",
    })
    .optional(),
  commsPositioning: z
    .string({
      invalid_type_error: "Communications Positioning must be a string",
    })
    .optional(),
  commsNfc: z
    .string({
      invalid_type_error: "Communications NFC must be a string",
    })
    .optional(),
  commsRadio: z
    .boolean({
      invalid_type_error: "Communications Radio must be a boolean",
    })
    .optional(),
  commsUsb: z
    .string({
      invalid_type_error: "Communications USB must be a string",
    })
    .optional(),
  featuresSensors: z
    .string({
      invalid_type_error: "Features Sensors must be a string",
    })
    .optional(),
  batteryType: z
    .string({
      invalid_type_error: "Battery Type must be a string",
    })
    .optional(),
  batteryCharging: z
    .string({
      invalid_type_error: "Battery Charging must be a string",
    })
    .optional(),
  miscColors: z
    .string({
      invalid_type_error: "Misc Colors must be a string",
    })
    .optional(),
  miscModels: z
    .string({
      invalid_type_error: "Misc Models must be a string",
    })
    .optional(),
  miscSar: z
    .string({
      invalid_type_error: "Misc SAR must be a string",
    })
    .optional(),
  miscSarEu: z
    .string({
      invalid_type_error: "Misc SAR (EU) must be a string",
    })
    .optional(),
  miscPrice: z
    .string({
      invalid_type_error: "Misc Price must be a string",
    })
    .optional(),
  metaTitle: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  metaDescription: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  status: z
    .enum(STATUS_TYPE, {
      invalid_type_error:
        "only published, draft, rejected and in_review are accepted",
    })
    .optional(),
  featuredImageId: z.string({
    required_error: "Featured Image is required",
    invalid_type_error: "Featured Image must be a string",
  }),
}

const updateGadgetInput = {
  ...gadgetInput,
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .min(1),
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
    }),
}

export const createGadgetSchema = z.object({
  ...gadgetInput,
})

export const updateGadgetSchema = z.object({
  ...updateGadgetInput,
})

export type CreateGadget = z.infer<typeof createGadgetSchema>
export type UpdateGadget = z.infer<typeof updateGadgetSchema>
