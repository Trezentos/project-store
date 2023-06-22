import { prisma } from '@/lib/prisma'
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

    const headerItems = headerItemsFromBase.map((headerItem) => {
      return {
        id: headerItem.id,
        name: getPropertyValueFrom(categories, {
          categoryId: headerItem.category_id,
          property: 'name',
        }),
        linkTo: getPropertyValueFrom(categories, {
          categoryId: headerItem.category_id,
          property: 'hifen',
        }),
        featuredImg: {
          name: headerItem.backgroundImageName,
          imageUrl: headerItem.backgroundImageLink,
          linkTo: headerItem.backgroundImageLinkTo,
        },
        categoryId: headerItem.category_id,
        headerSubItems: headerItem.HeaderSubItem.map((subHeaderItem) => {
          return {
            name: subHeaderItem.name,
            linkTo: getPropertyValueFrom(categories, {
              categoryId: subHeaderItem.category_id,
              property: 'hifen',
            }),
            isHighlighted: subHeaderItem.isHighlightedSubItem,
            columnPosition: subHeaderItem.columnPosition,
            categoryId: subHeaderItem.category_id,
          }
        }).sort((a, b) => {
          if (a.isHighlighted && !b.isHighlighted) {
            return -1
          } else if (!a.isHighlighted && b.isHighlighted) {
            return 1
          }

          // Manter a ordem original para valores iguais
          return 0
        }),
      }
    })

    return res.status(201).json(headerItems)
  } catch (error: any) {
    return res.json(error.message)
  }
}
