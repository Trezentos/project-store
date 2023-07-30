import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
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
    if (req.method !== 'DELETE') {
      return res.status(405).end()
    }

    const {
      query: { id },
    } = req

    const mainProduct = await prisma.product.findUnique({
      where: {
        id: String(id),
      },
      include: {
        ProductVariation: {
          include: {
            Image: true,
          },
        },
      },
    })

    if (!mainProduct) {
      return res.status(400).json('O produto já não existe no banco')
    }

    mainProduct.ProductVariation.forEach((productVariation) => {
      productVariation.Image.forEach(async (image) => {
        await deleteOldImageAWS(image.name)
      })
    })

    await prisma.product.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(204).end()
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
