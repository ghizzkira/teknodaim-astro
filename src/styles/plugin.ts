import plugin from "tailwindcss/plugin"

export const stylePlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "214 60% 16%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--primary": "11 73% 55%",
        "--primary-foreground": "13 100% 95%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--success": "141 76% 36%",
        "--success-foreground": "143 76% 97%",
        "--info": "199 89% 48%",
        "--info-foreground": "200 100% 97%",
        "--warning": "45 93% 47%",
        "--warning-foreground": "46 92% 95%",
        "--danger": "0 72% 51%",
        "--danger-foreground": "0 86% 97%",
        "--shop": "36.8 90.36% 51.18%",
        "--news": "230.85deg 44.36% 73.92%",
        "--news-foreground": "232.71deg 57.22% 36.67%",
        "--tips": "186.29deg 70.47% 70.78%",
        "--tips-foreground": "185.03deg 100% 28.04%",
        "--gadget": "291.3deg 46.94% 71.18%",
        "--gadget-foreground": "277.32deg 70.17% 35.49%",
        "--game": "354deg 100% 90.2%",
        "--game-foreground": "0deg 66.39% 46.67%",
        "--main": "11 73% 55%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem",
      },
      ".dark": {
        "--background": "224 71% 4%",
        "--foreground": "213 31% 91%",
        "--muted": "223 47% 11%",
        "--muted-foreground": "215.4 16.3% 56.9%",
        "--popover": "224 71% 4%",
        "--popover-foreground": "215 20.2% 65.1%",
        "--card": "224 71% 4%",
        "--card-foreground": "213 31% 91%",
        "--border": "216 34% 17%",
        "--input": "216 34% 17%",
        "--primary": "13 100% 95%",
        "--primary-foreground": "11 73% 55%",
        "--secondary": "222.2 47.4% 11.2%",
        "--secondary-foreground": "210 40% 98%",
        "--accent": "216 34% 17%",
        "--accent-foreground": "210 40% 98%",
        "--success": "149 61% 20%",
        "--success-foreground": "143 76% 97%",
        "--info": "198 80% 24%",
        "--info-foreground": "200 100% 97%",
        "--warning": "28 74% 26%",
        "--warning-foreground": "46 92% 95%",
        "--danger": "0 63% 31%",
        "--danger-foreground": "210 40% 98%",
        "--shop": "36.8 90.36% 51.18%",
        "--news": "230.85deg 44.36% 73.92%",
        "--news-foreground": "232.71deg 57.22% 36.67%",
        "--tips": "186.29deg 70.47% 70.78%",
        "--tips-foreground": "185.03deg 100% 28.04%",
        "--gadget": "291.3deg 46.94% 71.18%",
        "--gadget-foreground": "277.32deg 70.17% 35.49%",
        "--game": "354deg 100% 90.2%",
        "--game-foreground": "0deg 66.39% 46.67%",
        "--main": "11 73% 55%",
        "--ring": "216 34% 17%",
        "--radius": "0.5rem",
      },
    })
    addBase({
      "*": { "@apply border-border": {} },
      body: {
        "@apply bg-background text-foreground": {},
        fontFeatureSettings: '"rlig" 1, "calt" 1',
      },
      "::selection": { "@apply bg-primary/40 text-foreground": {} },
      "details[open].modal summary::before": {
        "@apply fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-100 content-[''] data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in":
          {},
      },
      h1: { "@apply text-2xl font-bold md:text-4xl": {} },
      h2: { "@apply text-xl font-bold md:text-3xl": {} },
      h3: { "@apply text-lg font-bold md:text-2xl": {} },
      h4: { "@apply text-base font-bold md:text-xl": {} },
      h5: { "@apply text-base font-bold md:text-lg": {} },
      ".scrollbar": { scrollBehavior: "smooth" },
      ".scrollbar::-webkit-scrollbar": { width: "3px" },
      ".short-container": {
        scrollSnapType: "y mandatory",
      },
      "details > summary::-webkit-details-marker": {
        display: "none",
      },
      "details summary:focus": {
        outline: "none",
      },
      "details summary::-webkit-details-marker": {
        display: "none",
      },
      "details > summary::before": {
        display: "",
      },
      ".scrollbar-hide": {
        scrollbarWidth: "none",
      },
      ".scrollbar::-webkit-scrollbar-track": {
        background: "transparent",
      },
      ".scrollbar::-webkit-scrollbar-thumb": {
        background: "#555",
      },

      ".scrollbar::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
      ".scrollbar::-webkit-scrollbar-track:hover": {
        background: "transparent",
      },

      "details[open] > summary > .fake-close-button": {
        pointerEvents: "all",
      },
      ".popover[open] > summary::before": {
        content: " ",
        display: "block",
        position: "fixed",
        top: "0",
        right: "0",
        left: "0",
        bottom: "0",
        zIndex: "1",
      },
      ".details-modal-overlay": {
        transition: "opacity 0.2s ease-out",
        pointerEvents: "none",
        background: "rgba(15, 23, 42, 0.8)",
        position: "fixed",
        opacity: "0",
        bottom: "0",
        right: "0",
        left: "0",
        top: "0",
      },
      "details[open] .details-modal-overlay": {
        pointerEvents: "all",
        opacity: "0.5",
      },
    })
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          shop: "hsl(var(--shop))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
          },
          info: {
            DEFAULT: "hsl(var(--info))",
            foreground: "hsl(var(--info-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            foreground: "hsl(var(--warning-foreground))",
          },
          danger: {
            DEFAULT: "hsl(var(--danger))",
            foreground: "hsl(var(--danger-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          news: {
            DEFAULT: "hsl(var(--news))",
            foreground: "hsl(var(--news-foreground))",
          },
          game: {
            DEFAULT: "hsl(var(--game))",
            foreground: "hsl(var(--game-foreground))",
          },
          gadget: {
            DEFAULT: "hsl(var(--gadget))",
            foreground: "hsl(var(--gadget-foreground))",
          },
          tips: {
            DEFAULT: "hsl(var(--tips))",
            foreground: "hsl(var(--tips-foreground))",
          },
          main: {
            DEFAULT: "hsl(var(--main))",
            foreground: "hsl(var(--main-foreground))",
          },
        },
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          sans: [
            "-apple-system",
            "BlinkMacSystemFont",
            "segoe ui",
            "helvetica neue",
            "Arial",
            "noto sans",
            "sans-serif",
            "apple color emoji",
            "segoe ui emoji",
            "segoe ui symbol",
            "noto color emoji",
          ],
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  },
)
