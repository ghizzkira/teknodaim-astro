import { stylePreset } from "./preset"
import type { Config } from "tailwindcss"

import { stylePreset } from "./preset"
import type { Config } from "tailwindcss"

export default {
  content: [""],
  theme: {
    extend: {},
  },
  presets: [stylePreset],
} satisfies Config
