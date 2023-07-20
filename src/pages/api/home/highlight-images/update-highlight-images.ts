import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import type { NextApiRequest, NextApiResponse } from 'next'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formatToDatabase = (dataToBase: any, device: string) => {
  if (device === '1') {
    return dataToBase
      ? {
          image1Link: dataToBase.Location,
          image1Key: dataToBase.Key,
          image1Name: dataToBase.originalName,
        }
      : {}
  }

  return dataToBase
    ? {
        image2Link: dataToBase.Location,
        image2Key: dataToBase.Key,
        image2Name: dataToBase.originalName,
      }
    : {}
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

    const image1AWSImage = await createNewImageAWS(newimageFile1)
    const image2AWSImage = await createNewImageAWS(newimageFile2)

    const image1ToUpdate = formatToDatabase(image1AWSImage, '1')
    const image2ToUpdate = formatToDatabase(image2AWSImage, '2')

    const updatedHighlighsImage = await prisma.highlightHomeImages.update({
      where: {
        id: String(highlightImageId),
      },
      data: {
        ...image1ToUpdate, // can be {content} || {}
        ...image2ToUpdate,
      },
    })

    if (image1AWSImage) await deleteOldImageAWS(oldHighlightImage.image1Key)
    if (image2AWSImage) await deleteOldImageAWS(oldHighlightImage.image2Key)

    return res.status(200).json(updatedHighlighsImage)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
