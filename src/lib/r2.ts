import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const r2Config = {
  region: "auto",
  endpoint: `https://${import.meta.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY,
    secretAccessKey: import.meta.env.R2_SECRET_KEY,
  },
}

export const r2Client = new S3Client(r2Config)

interface UploadImageToS3Props {
  file: Buffer
  fileName: string
  contentType?: string
  width?: number
  height?: number
  config: {
    region: "auto" | string
    accountId: string
    bucket: string
    credentials: {
      accessKeyId: string
      secretAccessKey: string
    }
  }
}

export async function uploadImageToR2({
  file,
  fileName,
  contentType = "image/webp",
  config,
}: UploadImageToS3Props): Promise<string> {
  const params = {
    Bucket: config.bucket,
    Key: fileName,
    Body: file,
    ContentType: contentType,
  }
  const r2Config = {
    region: config.region,
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.credentials.accessKeyId,
      secretAccessKey: config.credentials.secretAccessKey,
    },
  }
  const r2Client = new S3Client(r2Config)

  const command = new PutObjectCommand(params)
  await r2Client.send(command)

  return fileName
}
