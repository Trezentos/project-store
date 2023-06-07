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
      body: { id, active },
    } = req

    const returnedData = await prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        active,
      },
      include: { filters: true },
    })

    return res.status(200).json(returnedData)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
