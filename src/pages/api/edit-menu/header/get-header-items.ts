import { prisma } from '@/lib/prisma'
import formatHeaderItemsArray from '@/services/admin/menu/formatHeaderItemsArray'
import { ProductCategory } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const getPropertyValueFrom = (
  categories: ProductCategory[],
  {
    categoryId,
    property,
  }: { categoryId: string | null; property: 'hifen' | 'name' },
) => {
  return categories
    .filter((categorieItem) => {
      return categorieItem.id === categoryId
    })
    .reduce((_, curr) => curr[`${property}`], '')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const headerItemsFromBase = await prisma.headerItem.findMany({
      include: {
        HeaderSubItem: true,
      },
    })
    const categories = await prisma.productCategory.findMany({})

    if (!headerItemsFromBase || !categories)
      return res.status(400).json({ message: 'No header items were found' })

    const headerItems = formatHeaderItemsArray(headerItemsFromBase, categories)

    return res.status(201).json(headerItems)
  } catch (error: any) {
    return res.json(error.message)
  }
}
