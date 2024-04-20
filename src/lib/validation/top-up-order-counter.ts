import { z } from "zod"

const topUpOrderCounterInput = {
  brand: z
    .string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be a string",
    })
    .min(2),
}

export const upsertTopUpOrderCounterSchema = z.object({
  ...topUpOrderCounterInput,
})

export type UpsertTopUpOrderCounter = z.infer<
  typeof upsertTopUpOrderCounterSchema
>
