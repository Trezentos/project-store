import s3, { s3ParamsToUpload } from '@/lib/s3'
import verifyFileType from '@/pages/api/home/utils/verifyImageFileType'
import formidable from 'formidable'

export default async function createNewImageAWS(imageItem: any) {
  if (!imageItem) return

  await verifyFileType(String(imageItem.filepath))

  const typedNewimageFile = imageItem as formidable.File

  const paramsToUpload = s3ParamsToUpload(typedNewimageFile)

  const newFile = await s3.upload(paramsToUpload).promise()

  return newFile
}
