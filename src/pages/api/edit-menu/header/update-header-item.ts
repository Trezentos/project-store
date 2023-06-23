import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { formatHeaderItemObject } from '@/services/admin/menu/formatHeaderItemsArray'

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
      body: { headerItemName, headerItemId, newCategoryId },
    } = req

    const categories = await prisma.productCategory.findMany({})

    const updatedHeaderItem = await prisma.headerItem.update({
      where: {
        id: headerItemId,
      },
      data: {
        name: headerItemName,
        category_id: newCategoryId,
      },
      include: {
        HeaderSubItem: true,
      },
    })

    const formatedHeaderItem = formatHeaderItemObject(
      updatedHeaderItem,
      categories,
    )

    return res.status(200).json(formatedHeaderItem)
  } catch (error: any) {
    console.log(error.message)
    return res.json(error.message)
  }
}
