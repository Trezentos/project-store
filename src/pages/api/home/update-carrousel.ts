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

    const toVeriFyDesktop = newDesktopImage as formidable.File
    const toVeriFyMobile = newMobileImage as formidable.File

    if (newDesktopImage) await verifyFileType(String(toVeriFyDesktop.filepath))
    if (newMobileImage) await verifyFileType(String(toVeriFyMobile.filepath))

    // @ts-ignore
    if (newDesktopImage?.size > 3500000 || newMobileImage?.size > 3500000) {
      return res.status(400).json('As imagens não podem passar de 3 megabytes')
    }

    const { carrouselItemId } = fields

    const newFiles = [
      {
        newImage: newMobileImage,
        device: 'mobile',
      },
      {
        newImage: newDesktopImage,
        device: 'desktop',
      },
    ]

    const updatedCarrousel = newFiles.map(async (fileItem, index) => {
      const { newImage, device } = fileItem

      if (!newImage) return

      const paramsToUpload = s3ParamsToUpload(newImage as formidable.File)

      const returnedS3Upload = await s3.upload(paramsToUpload).promise()

      const oldCarrousel = await prisma.carrousselImage.findFirst({
        where: {
          id: String(carrouselItemId),
        },
      })

      const dataToUpdate = carrouselToUpdate(device, returnedS3Upload)

      const updatedData = await prisma.carrousselImage.update({
        where: {
          id: String(carrouselItemId),
        },
        data: dataToUpdate,
      })

      const paramsToDelete = s3ParamsToDelete(
        device === 'desktop'
          ? oldCarrousel?.desktopKey
          : oldCarrousel?.mobileKey,
      )

      await s3.deleteObject(paramsToDelete).promise()

      return updatedData
    })

    const newCarrousel = await Promise.all(updatedCarrousel)

    if (!newCarrousel[0]) return res.json(newCarrousel[1])

    if (!newCarrousel[1]) return res.json(newCarrousel[0])

    return res.json(newCarrousel[1])
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
