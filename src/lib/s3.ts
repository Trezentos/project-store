import AWS from 'aws-sdk'
import formidable from 'formidable'
import fs from 'fs'
import crypto from 'node:crypto'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export function s3ParamsToUpload(newImage: formidable.File) {
  return {
    Bucket: process.env.S3_BUCKET_NAME ?? '',
    Key: String(newImage.originalFilename) ?? '',
    Body: fs.readFileSync(newImage.filepath),
    ContentType: 'mimeType',
    ACL: 'public-read',
  }
}

export function s3ParamsToDelete(key: string | undefined) {
  return {
    Bucket: process.env.S3_BUCKET_NAME ?? '',
    Key: key ?? '',
  }
}

export default s3
