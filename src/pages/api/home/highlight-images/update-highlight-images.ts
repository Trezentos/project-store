import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyFileType from '../utils/verifyImageFileType'
import formidable from 'formidable'
import s3, { s3ParamsToDelete, s3ParamsToUpload } from '@/lib/s3'

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
    if (req.method !== 'PATCH') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)
    const { newimageFile1, newimageFile2 } = files
    const { highlightImageId } = fields

    const oldHighlightImage = await prisma.highlightHomeImages.findFirst({
      where: {
        id: String(highlightImageId),
      },
    })

    if (!oldHighlightImage)
      throw new Error(
        'Não foi possível encontrar as antigas imagens para editar',
      )

    const itemsToModify = [
      newimageFile1 && { ...newimageFile1, identifier: '1' },
      newimageFile2 && { ...newimageFile2, identifier: '2' },
    ]

    const result = itemsToModify.map(async (item, index) => {
      if (!item) return

      const typedNewimageFile = item as formidable.File

      await verifyFileType(res, String(typedNewimageFile.filepath))

      const paramsToUpload = s3ParamsToUpload(typedNewimageFile)

      const returnedS3File = await s3.upload(paramsToUpload).promise()

      const newHighlightProduct = await prisma.highlightHomeImages.update({
        data:
          item.identifier === '1'
            ? {
                image1Key: returnedS3File.Key,
                image1Link: returnedS3File.Location,
              }
            : {
                image2Key: returnedS3File.Key,
                image2Link: returnedS3File.Location,
              },
        where: {
          id: String(highlightImageId),
        },
      })

      const paramsToDelete = s3ParamsToDelete(oldHighlightImage?.image1Key)
      await s3.deleteObject(paramsToDelete).promise()

      return newHighlightProduct
    })

    const newItems = await Promise.all(result)

    const filteredImages = newItems.filter((item) => item !== undefined)

    if (filteredImages.length === 1) {
      return res.status(201).json(filteredImages[0])
    }

    const moreUpdated = filteredImages.filter((item) => {
      return (
        item?.image1Key !== oldHighlightImage.image1Key &&
        item?.image2Key !== oldHighlightImage.image2Key
      )
    })

    return res.status(201).json(moreUpdated[0])
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
