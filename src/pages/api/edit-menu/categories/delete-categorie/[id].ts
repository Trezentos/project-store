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

    const categoryItem = await prisma.productCategory.findFirst({
      where: {
        id: String(id),
      },
    })

    if (!categoryItem)
      return res.status(404).json({
        message:
          'Houve um erro ao tentar encontrar a categoria para remover...',
      })

    const paramsToDelete = s3ParamsToDelete(categoryItem.imageBackgroundName)

    await s3.deleteObject(paramsToDelete).promise()

    await prisma.productCategory.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(204)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
