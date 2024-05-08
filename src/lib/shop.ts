import type { DigiflazzPriceListPrePaidResponse } from "./db/action/top-up"
import { slugify } from "./utils/slug"

import type { DigiflazzPriceListPrePaidResponse } from "./db/action/top-up"
import { slugify } from "./utils/slug"

export function addPricesProperties(item: DigiflazzPriceListPrePaidResponse) {
  const slug = slugify(item.brand)

  return {
    ...item,
    slug,
  }
}
