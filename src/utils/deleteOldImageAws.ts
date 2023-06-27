import s3, { s3ParamsToDelete, s3ParamsToUpload } from '@/lib/s3'
import verifyFileType from '@/pages/api/home/utils/verifyImageFileType'
import formidable from 'formidable'

export default async function deleteOldImageAWS(imageKey: string | null) {
  if (!imageKey) return

  const paramsToDelete = s3ParamsToDelete(imageKey)

  await s3.deleteObject(paramsToDelete).promise()
}
