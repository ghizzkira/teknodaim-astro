export const wpHttp = async <T>(
  query: string,
  variables?: string | number | object | undefined,
): Promise<[T | null, null | Error]> => {
  const defaultConfig = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }
  const url = new URL(import.meta.env.PUBLIC_WP_API ?? "")

  try {
    const res = await fetch(url.toString(), defaultConfig)

    if (!res.ok) {
      console.error(url)
      throw new Error(res.statusText)
    }

    const data = await res.json()
    return [data as T, null]
  } catch (err) {
    console.error(url.href, err)
    throw new Error(err as unknown as string)
    return [null, err as Error]
  }
}
