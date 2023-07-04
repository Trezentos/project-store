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

    const headerSubItem = await prisma.headerSubItem.delete({
      where: {
        id: String(id),
      },
    })

    if (!headerSubItem)
      return res.status(404).json({
        message:
          'Houve um erro ao tentar encontrar o subitem do cabeçalho para remover...',
      })

    return res.status(204).end()
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
