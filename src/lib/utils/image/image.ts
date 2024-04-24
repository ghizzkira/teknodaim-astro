import type { AstroConfig, ImageTransform, LocalImageService } from "astro"
import { optimizeImage } from "wasm-image-optimization"

const service: LocalImageService = {
  getURL(options: ImageTransform, _imageConfig: AstroConfig["image"]) {
    const searchParams = new URLSearchParams()
    searchParams.append(
      "href",
      typeof options.src === "string" ? options.src : options.src.src,
    )
    options.width && searchParams.append("w", options.width.toString())
    options.height && searchParams.append("h", options.height.toString())
    options.quality && searchParams.append("q", options.quality.toString())
    options.format && searchParams.append("f", options.format)
    return `/_image?${searchParams}`
  },
  parseURL(url: URL, imageConfig) {
    const params = url.searchParams

    return {
      src: params.get("href")!,
      width: params.has("w") ? parseInt(params.get("w")!) : undefined,
      height: params.has("h") ? parseInt(params.get("h")!) : undefined,
      format: params.get("f"),
      quality: params.get("q"),
    }
  },
  async transform(
    buffer: Uint8Array,
    options: { src: string; [key: string]: any },
    imageConfig,
  ): Promise<{ data: Uint8Array; format: string }> {
    let image = await optimizeImage({
      image: Buffer.from(buffer),
      format: options.format,
      quality: options.quality,
      width: options.width,
      height: options.height,
    })
    return {
      data: new Uint8Array(image!),
      format: options.format,
    }
  },

  getHTMLAttributes(options, imageConfig) {
    let targetWidth = options.width
    let targetHeight = options.height
    if (typeof options.src === "object") {
      const aspectRatio = options.src.width / options.src.height

      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio)
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio)
      }
    }

    const { src, width, height, format, quality, ...attributes } = options

    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async",
    }
  },
}

export default service
