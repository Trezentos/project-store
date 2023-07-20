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
import verifyFileType from './utils/verifyImageFileType'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formatToDatabase = (dataToBase: any, device: string) => {
  if (device === 'desktop') {
    return dataToBase
      ? {
          desktopLink: dataToBase.Location,
          desktopKey: dataToBase.Key,
          desktopImageName: dataToBase.originalName,
        }
      : {}
  }

  return dataToBase
    ? {
        mobileLink: dataToBase.Location,
        mobileKey: dataToBase.Key,
        mobileImageName: dataToBase.originalName,
      }
    : {}
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
    const { carrouselItemId } = fields

    const oldCarrousel = await prisma.carrousselImage.findFirst({
      where: {
        id: String(carrouselItemId),
      },
    })

    if (!oldCarrousel) {
      return res.status(400).json('Não foi possível encontrar a imagem antiga')
    }

    const desktopAWSImage = await createNewImageAWS(newDesktopImage)
    const mobileAWSImage = await createNewImageAWS(newMobileImage)

    const desktopToUpdate = formatToDatabase(desktopAWSImage, 'desktop')
    const mobileToUpdate = formatToDatabase(mobileAWSImage, 'mobile')

    const updatedCarrousel = await prisma.carrousselImage.update({
      where: {
        id: String(carrouselItemId),
      },
      data: {
        ...desktopToUpdate, // can be {content} || {}
        ...mobileToUpdate,
      },
    })

    if (desktopAWSImage) await deleteOldImageAWS(oldCarrousel.desktopKey)
    if (mobileAWSImage) await deleteOldImageAWS(oldCarrousel.mobileKey)

    return res.status(200).json(updatedCarrousel)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
