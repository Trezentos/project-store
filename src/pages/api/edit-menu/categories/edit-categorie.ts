import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import verifyFileType from '../../home/utils/verifyImageFileType'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)
    const { imageFile } = files
    const { id, categoryName, ...allOptions } = fields

    const oldCategory = await prisma.productCategory.findFirst({
      where: {
        id: String(id),
      },
    })

    const newImage = await createNewImageAWS(imageFile)

    const newImageFormatted = newImage
      ? {
          imageBackgroundName: newImage.Key,
          imageBackgroundLink: newImage.Location,
        }
      : {}

    const updatedCategory = await prisma.productCategory.update({
      include: {
        filters: true,
      },
      where: {
        id: String(id),
      },
      data: {
        name: String(categoryName),
        ...newImageFormatted,
      },
    })

    if (oldCategory) await deleteOldImageAWS(oldCategory.imageBackgroundName)

    return res.status(200).json(updatedCategory)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
