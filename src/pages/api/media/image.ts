import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createMedia } from "@/lib/action/media"
import { uploadImageToR2 } from "@/lib/r2"
import { uniqueCharacter } from "@/lib/utils/id"
import { slugifyFile } from "@/lib/utils/slug"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user

    if (!user?.role.includes("admin" || "author")) {
      return new Response(null, {
        status: 401,
      })
    }

    const formData = await context.request.formData()

    const file = formData.get("file") as Blob | null

    if (!file) {
      return new Response("File Blob is required", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    //@ts-ignore
    const [fileName, _fileType] = file?.name.split(".") || []

    const defaultFileType = "image/webp"
    const defaultFileExtension = "webp"

    const uniqueFileName = `${slugifyFile(
      fileName,
    )}_${uniqueCharacter()}.${defaultFileExtension}`

    await uploadImageToR2({
      file: buffer,
      fileName: uniqueFileName,
      contentType: defaultFileType,
    })

    const data = await createMedia({
      name: uniqueFileName,
      url: "https://" + import.meta.env.R2_DOMAIN + "/" + uniqueFileName,
      type: defaultFileType,
      authorId: user?.id!,
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 500 })
  }
}
