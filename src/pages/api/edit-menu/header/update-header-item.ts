import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

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

    const updatedHeaderItem = await prisma.headerItem.update({
      where: {
        id: headerItemId,
      },
      data: {
        name: headerItemName,
        category_id: newCategoryId,
      },
    })

    console.log(updatedHeaderItem)

    return res.status(200).json(updatedHeaderItem)
  } catch (error: any) {
    console.log(error.message)
    return res.json(error.message)
  }
}
