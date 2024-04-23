import createDigiflazzConfig from "digiflazz-sdk"

export const digiflazz = createDigiflazzConfig({
  username: import.meta.env.DIGIFLAZZ_USERNAME!,
  key:
    import.meta.env.APP_ENV === "development"
      ? import.meta.env.DIGIFLAZZ_API_KEY_DEV!
      : import.meta.env.DIGIFLAZZ_API_KEY_PROD!,
})
