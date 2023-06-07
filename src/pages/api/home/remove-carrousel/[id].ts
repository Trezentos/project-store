import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'

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
    if (req.method !== 'DELETE') {
      return res.status(405).end()
    }

    const {
      query: { id },
    } = req

    const carrouselItem = await prisma.carrousselImage.findFirst({
      where: {
        id: String(id),
      },
    })

    if (!carrouselItem)
      res.status(404).json({
        message: 'Houve um erro ao encontrar o carrosel para remover...',
      })

    await prisma.carrousselImage.delete({
      where: {
        id: String(id),
      },
    })

    const paramsToDeleteMobileImage = s3ParamsToDelete(
      carrouselItem?.desktopKey,
    )
    const paramsToDeleteDesktopImage = s3ParamsToDelete(
      carrouselItem?.mobileKey,
    )

    await s3.deleteObject(paramsToDeleteMobileImage).promise()
    await s3.deleteObject(paramsToDeleteDesktopImage).promise()

    return res.json({})
  } catch (error: any) {
    return res.json(error.message)
  }
}
