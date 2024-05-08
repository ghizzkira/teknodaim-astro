import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { STATUS_TYPE } from "@/lib/validation/status"
import { medias } from "./media"

export const gadgets = sqliteTable("gadgets", {
  id: text("id").primaryKey(),
  title: text("title").unique().notNull(),
  wpTagSlug: text("wp_tag_slug"),
  wpCategorySlug: text("wp_category_slug"),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  networkTechnology: text("network_technology"),
  launchAnnounced: text("launch_announced"),
  launchStatus: text("launch_status"),
  bodyDimensions: text("body_dimensions"),
  bodyWeight: text("body_weight"),
  bodySimCard: text("body_sim_card"),
  displayType: text("display_type"),
  displaySize: text("display_size"),
  displayResolution: text("display_resolution"),
  platformOs: text("platform_os"),
  platformChipset: text("platform_chipset"),
  platformCpu: text("platform_cpu"),
  platformGpu: text("platform_gpu"),
  memoryCardSlot: text("memory_card_slot"),
  memoryInternal: text("memory_internal"),
  mainCamera: text("main_camera"),
  mainCameraFeatures: text("main_camera_features"),
  mainCameraVideo: text("main_camera_video"),
  selfieCamera: text("selfie_camera"),
  selfieCameraVideo: text("selfie_camera_video"),
  soundLoudspeaker: text("sound_loudspeaker"),
  sound35mmJack: integer("sound_35mm_jack", { mode: "boolean" }),
  commsWlan: text("comms_wlan"),
  commsBluetooth: text("coms_bluetooth"),
  commsPositioning: text("coms_positioning"),
  commsNfc: text("comms_nfc"),
  commsRadio: integer("comms_radio", { mode: "boolean" }),
  commsUsb: text("comms_usb"),
  featuresSensors: text("features_sensors"),
  batteryType: text("battery_type"),
  batteryCharging: text("battery_charging"),
  miscColors: text("misc_colors"),
  miscModels: text("misc_models"),
  miscSar: text("misc_sar"),
  miscSarEu: text("misc_sar_eu"),
  miscPrice: text("misc_price"),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  featuredImageId: text("featured_image_id")
    .notNull()
    .references(() => medias.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type InsertGadget = typeof gadgets.$inferInsert
export type SelectGadget = typeof gadgets.$inferSelect
