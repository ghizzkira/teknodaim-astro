export const wpHttp = async <T>(
  query: string,
  variables?: string | number | object | undefined,
): Promise<[T | null, null | Error]> => {
  const defaultConfig = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }

  const url = new URL(import.meta.env.WP_API ?? "")

  try {
    const res = await fetch(url.toString(), defaultConfig)

    if (!res.ok) {
      console.error(url)
      throw new Error(res.statusText)
    }

    const data = await res.json()
    return [data, null]
  } catch (err) {
    console.error(url.href, err)
    return [null, err as Error]
  }
}
