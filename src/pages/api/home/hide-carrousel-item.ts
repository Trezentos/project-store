import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'

export const config = {
  api: {
    bodyParser: true,
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

    const {
      body: { carrouselCard },
    } = req

    const updatedCarrousel = await prisma.carrousselImage.update({
      where: {
        id: String(carrouselCard.id),
      },
      data: {
        active: carrouselCard.active,
      },
    })

    if (!updatedCarrousel) return res.status(404).end()

    return res.status(200).end()
  } catch (error: any) {
    return res.json(error.message)
  }
}
