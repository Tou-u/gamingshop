import { S3Client } from '@aws-sdk/client-s3'

export const PUBLIC_URL = 'https://pub-6c68c522d75b4c9a8c5f083c276e124f.r2.dev'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
})
