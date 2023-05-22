import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import carrouselToUpdate from './utils/carrouselDataToUpdate'
import { object } from 'zod'
import { CarrousselImage } from '@prisma/client'
import fs from 'fs'
import { fileTypeFromFile } from 'file-type'
import verifyFileType from './utils/verifyImageFileType'

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

    const { files } = await formToDataFormatter(req)
    const { desktopImage, mobileImage } = files

    const desktopImageFile = desktopImage as formidable.File
    const mobileImageFile = mobileImage as formidable.File

    await verifyFileType(res, String(desktopImageFile.filepath))
    await verifyFileType(res, String(mobileImageFile.filepath))

    if (desktopImageFile.size > 3500000 || mobileImageFile.size > 3500000) {
      return res.status(400).json('As imagens não podem passar de 3 megabytes')
    }

    const desktopParamsS3 = s3ParamsToUpload(desktopImageFile)
    const mobileParamsS3 = s3ParamsToUpload(mobileImageFile)

    const returnedDesktopS3 = await s3.upload(desktopParamsS3).promise()
    const returnedMobileS3 = await s3.upload(mobileParamsS3).promise()

    const newCarrousel = await prisma.carrousselImage.create({
      data: {
        desktopKey: returnedDesktopS3.Key,
        desktopLink: returnedDesktopS3.Location,
        mobileKey: returnedMobileS3.Key,
        mobileLink: returnedMobileS3.Location,
      },
    })

    return res.status(200).json(newCarrousel)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
