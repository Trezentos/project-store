import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import verifyFileType from '../../home/utils/verifyImageFileType'
import createNewImageAWS from '@/utils/createNewImageAws'
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
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)
    const { imageFile } = files
    const { categoryName, ...allFiltersIds } = fields

    const newImage = await createNewImageAWS(imageFile)

    if (!newImage) {
      return res
        .status(400)
        .json({ message: 'Não foi possível adicionar a imagem' })
    }

    const filterCategorie = await prisma.productFilter.findMany({})
    const filtersToConnect = [...Object.values(allFiltersIds)].map((item) => ({
      id: String(item),
    }))

    if (!filterCategorie) {
      return res
        .status(400)
        .json({ message: 'Não foi possível encontrar o filtro' })
    }

    const newCategorie = await prisma.productCategory.create({
      data: {
        imageBackgroundLink: newImage.Location,
        imageBackgroundName: newImage.Key,
        imageBackgroundOriginalName: newImage.originalName,
        hifen: encodeURI(String(categoryName)),
        name: String(categoryName),
        filters: { connect: filtersToConnect },
      },
      include: {
        filters: true,
      },
    })

    return res.status(200).json(newCategorie)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}
