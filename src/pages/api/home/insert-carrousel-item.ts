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
import createNewImageAWS from '@/utils/createNewImageAws'

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

    const returnedDesktopS3 = await createNewImageAWS(desktopImage)
    const returnedMobileS3 = await createNewImageAWS(mobileImage)

    if (!returnedDesktopS3 || !returnedMobileS3) {
      return res.status(400).json('Houve algum erro ao criar as imagens...')
    }

    const newCarrousel = await prisma.carrousselImage.create({
      data: {
        desktopKey: returnedDesktopS3.Key,
        desktopLink: returnedDesktopS3.Location,
        desktopImageName: returnedDesktopS3.originalName,
        mobileKey: returnedMobileS3.Key,
        mobileLink: returnedMobileS3.Location,
        mobileImageName: returnedMobileS3.originalName,
      },
    })

    return res.status(200).json(newCarrousel)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
