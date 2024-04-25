import type { AstroConfig, ImageTransform, LocalImageService } from "astro"
import * as photon from "@cf-wasm/photon"

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
    const inputImage = photon.PhotonImage.new_from_byteslice(buffer)
    const aspectRatio = inputImage.get_width() / inputImage.get_height()
    let targetWidth = options.width
    let targetHeight = options.height
    if (options.height && !options.width) {
      targetWidth = Math.round(options.height * aspectRatio)
    } else if (options.height && !options.width) {
      targetWidth = Math.round(options.height * aspectRatio)
    } else if (options.width && !options.height) {
      targetHeight = Math.round(options.width / aspectRatio)
    }
    const image = photon
      // to_image_data(inputImage)
      .resize(inputImage, targetWidth, targetHeight, 1)
    const outputBytes = image.get_bytes_jpeg(
      options.quality ? parseInt(options.quality) : 50,
    )
    image.free()
    inputImage.free()

    return {
      data: new Uint8Array(outputBytes),
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
