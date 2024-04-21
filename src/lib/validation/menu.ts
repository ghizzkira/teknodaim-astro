import { z } from "zod"

export const MENU_POSITION = [
  "sidebar_all",
  "sidebar_all_amp",
  "sidebar_all_id",
  "sidebar_all_id_amp",
  "sidebar_all_en",
  "sidebar_all_en_amp",
  "sidebar_shop_all",
  "sidebar_shop_en",
  "sidebar_shop_id",
  "footer_all",
  "footer_all_amp",
  "footer_id",
  "footer_id_amp",
  "footer_en",
  "footer_en_amp",
  "footer_shop_all",
  "footer_shop_id",
  "footer_shop_en",
] as const

export const menuPosition = z.enum(MENU_POSITION)

const menuInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1),
  link: z
    .string({
      invalid_type_error: "Link must be a string",
    })
    .optional(),
  position: z.enum(MENU_POSITION, {
    invalid_type_error: "your menu position doesnt exist on available option.",
  }),
  order: z
    .number({
      invalid_type_error: "Order must be a number",
    })
    .optional(),
  icon: z
    .string({
      invalid_type_error: "Icon must be a string",
    })
    .optional(),
  iconDark: z
    .string({
      invalid_type_error: "Icon must be a string",
    })
    .optional(),
  active: z
    .boolean({
      invalid_type_error: "Active must be a boolean",
    })
    .optional(),
}

export const updateMenuInput = {
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  }),
  ...menuInput,
}

export const createMenuSchema = z.object({
  ...menuInput,
})

export const updateMenuSchema = z.object({
  ...updateMenuInput,
})

export type MenuPosition = z.infer<typeof menuPosition>
export type CreateMenu = z.infer<typeof createMenuSchema>
export type UpdateMenu = z.infer<typeof updateMenuSchema>
