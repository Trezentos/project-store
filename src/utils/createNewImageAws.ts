import s3, { s3ParamsToUpload } from '@/lib/s3'
import verifyFileType from '@/pages/api/home/utils/verifyImageFileType'
import formidable from 'formidable'

export default async function createNewImageAWS(imageItem: any) {
  if (!imageItem) return
  const typedNewimageFile = imageItem as formidable.File

  await verifyFileType(String(typedNewimageFile.filepath))

  if (typedNewimageFile.size > 3500000) {
    throw new Error('As imagens não podem passar de 3 megabytes')
  }

  const paramsToUpload = s3ParamsToUpload(typedNewimageFile)

  const newFile = await s3.upload(paramsToUpload).promise()

  return {
    ...newFile,
    originalName: typedNewimageFile.originalFilename,
  }
}
