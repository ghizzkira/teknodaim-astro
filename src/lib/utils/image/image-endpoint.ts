import type { APIRoute } from "astro"
import { getConfiguredImageService } from "astro/assets"
import { imageConfig } from "astro:assets"
import * as mime from "mrmime"

function matchPattern(url: URL, remotePattern: URL) {
  return (
    matchProtocol(url, remotePattern.protocol) &&
    matchHostname(url, remotePattern.hostname, true) &&
    matchPort(url, remotePattern.port) &&
    matchPathname(url, remotePattern.pathname, true)
  )
}
function matchPort(url: { port: any }, port: any) {
  return !port || port === url.port
}
function matchProtocol(url: { protocol: string | any[] }, protocol: any) {
  return !protocol || protocol === url.protocol.slice(0, -1)
}
function matchHostname(
  url: URL,
  hostname: string,
  allowWildcard?: boolean | undefined,
) {
  if (!hostname) {
    return true
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2)
    return (
      slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname)
    )
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1)
    const additionalSubdomains = url.hostname
      .replace(slicedHostname, "")
      .split(".")
      .filter(Boolean)
    return additionalSubdomains.length === 1
  }
  return false
}
function matchPathname(
  url: { pathname: string },
  pathname: string,
  allowWildcard?: boolean,
) {
  if (!pathname) {
    return true
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2)
    return (
      slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname)
    )
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1)
    const additionalPathChunks = url.pathname
      .replace(slicedPathname, "")
      .split("/")
      .filter(Boolean)
    return additionalPathChunks.length === 1
  }
  return false
}
function isRemoteAllowed(src: string, { domains = [], remotePatterns = [] }) {
  if (!isRemotePath(src)) return false
  const url = new URL(src)
  return (
    domains.some((domain) => matchHostname(url, domain)) ||
    remotePatterns.some((remotePattern) => matchPattern(url, remotePattern))
  )
}
export const fnv1a52 = (str: string) => {
  const len = str.length
  let i = 0,
    t0 = 0,
    v0 = 0x2325,
    t1 = 0,
    v1 = 0x8422,
    t2 = 0,
    v2 = 0x9ce4,
    t3 = 0,
    v3 = 0xcbf2

  while (i < len) {
    v0 ^= str.charCodeAt(i++)
    t0 = v0 * 435
    t1 = v1 * 435
    t2 = v2 * 435
    t3 = v3 * 435
    t2 += v0 << 8
    t3 += v1 << 8
    t1 += t0 >>> 16
    v0 = t0 & 65535
    t2 += t1 >>> 16
    v1 = t1 & 65535
    v3 = (t3 + (t2 >>> 16)) & 65535
    v2 = t2 & 65535
  }

  return (
    (v3 & 15) * 281474976710656 +
    v2 * 4294967296 +
    v1 * 65536 +
    (v0 ^ (v3 >> 4))
  )
}

export const etag = (payload: string, weak = false) => {
  const prefix = weak ? 'W/"' : '"'
  return (
    prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"'
  )
}
function isRemotePath(src: string) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:")
}
async function loadRemoteImage(src: URL, headers: Headers) {
  try {
    const res = await fetch(src, {
      // Forward all headers from the original request
      headers,
    })

    if (!res.ok) {
      return undefined
    }

    return await res.arrayBuffer()
  } catch (err: unknown) {
    return undefined
  }
}

/**
 * Endpoint used in dev and SSR to serve optimized images by the base image services
 */
export const GET: APIRoute = async ({ request }) => {
  try {
    const imageService = await getConfiguredImageService()

    if (!("transform" in imageService)) {
      throw new Error("Configured image service is not a local service")
    }

    const url = new URL(request.url)
    const transform = await imageService.parseURL(url, imageConfig)

    if (!transform?.src) {
      throw new Error("Incorrect transform returned by `parseURL`")
    }

    let inputBuffer: ArrayBuffer | undefined = undefined

    const isRemoteImage = isRemotePath(transform.src)
    const sourceUrl = isRemoteImage
      ? new URL(transform.src)
      : new URL(transform.src, url.origin)

    if (
      isRemoteImage &&
      isRemoteAllowed(transform.src, imageConfig) === false
    ) {
      return new Response("Forbidden kontol", { status: 403 })
    }

    inputBuffer = await loadRemoteImage(
      sourceUrl,
      isRemoteImage ? new Headers() : request.headers,
    )

    if (!inputBuffer) {
      return new Response("Not Found", { status: 404 })
    }

    const { data, format } = await imageService.transform(
      new Uint8Array(inputBuffer),
      transform,
      imageConfig,
    )

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": mime.lookup(format) ?? `image/${format}`,
        "Cache-Control": "public, max-age=31536000",
        ETag: etag(data.toString()),
        Date: new Date().toUTCString(),
      },
    })
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error("Could not process image request:", err)
    return new Response(`Server Error: ${err}`, { status: 500 })
  }
}
