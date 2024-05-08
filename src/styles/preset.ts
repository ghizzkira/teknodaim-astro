import { stylePlugin } from "./plugin"
import formsPlugin from "@tailwindcss/forms"
import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

import { stylePlugin } from "./plugin"
import formsPlugin from "@tailwindcss/forms"
import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

export const stylePreset = {
  content: [],
  darkMode: ["class"],
  plugins: [stylePlugin, animatePlugin, formsPlugin({ strategy: "base" })],
} satisfies Config
