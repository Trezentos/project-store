import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  formatHeaderItemObject,
  formatSubHeaderItemObject,
} from '@/services/admin/menu/formatHeaderItemsArray'
import formToDataFormatter from '@/utils/formToDataFormatter'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'
import changeNewHeaderItemImage from '@/services/admin/menu/changeNewHeaderItemImage'

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

    const { fields } = await formToDataFormatter(req)
    const {
      subHeaderItemName,
      categoryId,
      columnPosition,
      highlightItem,
      headerItemId,
    } = fields

    const category = await prisma.productCategory.findFirst({
      where: {
        id: String(categoryId),
      },
    })

    if (!category) {
      return res.status(405).json({ message: 'Categoria não encontrada' })
    }

    const newSubHeaderItem = await prisma.headerSubItem.create({
      data: {
        name: String(subHeaderItemName),
        category_id: String(categoryId),
        columnPosition: Number(columnPosition),
        isHighlightedSubItem: highlightItem === 'true',
        HeaderItem: {
          connect: {
            id: String(headerItemId),
          },
        },
      },
      include: {
        ProductCategory: true,
      },
    })

    const formattedSubItem = formatSubHeaderItemObject(
      newSubHeaderItem,
      category,
    )
    return res.status(200).json(formattedSubItem)
  } catch (error: any) {
    console.log(error.message)
    return res.json(error.message)
  }
}
