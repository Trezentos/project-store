import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import carrouselToUpdate from './utils/carrouselDataToUpdate'
import { object } from 'zod'
import { CarrousselImage } from '@prisma/client'
import fs from 'fs'

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
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)
    const { newDesktopImage, newMobileImage } = files

    // @ts-ignore
    if (newDesktopImage?.size > 3500000 || newMobileImage?.size > 3500000) {
      return res.status(400).json('As imagens não podem passar de 3 megabytes')
    }

    return res.json({ message: 'insert carrousel' })
  } catch (error: any) {
    return res.json(error.message)
  }
}
