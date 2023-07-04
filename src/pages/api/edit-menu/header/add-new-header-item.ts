import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm, Fields, Files } from 'formidable'
import path from 'path'
import s3, { s3ParamsToUpload, s3ParamsToDelete } from '@/lib/s3'
import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import verifyFileType from '../../home/utils/verifyImageFileType'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'
import { addNewImageHeaderItem } from '@/services/admin/menu/addNewImageHeaderItem'
import { formatHeaderItemObject } from '@/services/admin/menu/formatHeaderItemsArray'

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
    const { categoryId, headerItemName } = fields

    const returnedObjectImage = await addNewImageHeaderItem({
      imageFile,
      categoryId,
    })

    const newHeaderItem = await prisma.headerItem.create({
      include: {
        HeaderSubItem: true,
      },
      data: {
        ...returnedObjectImage,
        name: String(headerItemName),
        ProductCategory: {
          connect: {
            id: String(categoryId),
          },
        },
      },
    })

    const categoryItem = await prisma.productCategory.findFirst({
      where: {
        id: String(categoryId),
      },
    })

    if (!categoryItem) {
      return res.status(404).json('Categoria não encontrada')
    }

    const formattedNewHeaderItem = formatHeaderItemObject(
      newHeaderItem,
      categoryItem,
    )

    return res.status(200).json(formattedNewHeaderItem)
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
