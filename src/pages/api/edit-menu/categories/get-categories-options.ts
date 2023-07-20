import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface FiltersProps {
  id: string
  name: string
  hifen: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const categories = await prisma.productCategory.findMany({})

    if (!categories)
      return res.status(400).json({ message: 'No categories were found' })

    const categoriesOptions = categories
      .filter((category) => category.active)
      .map((category) => ({
        label: category.name,
        value: category.id,
      }))

    return res.status(201).json(categoriesOptions)
  } catch (error: any) {
    console.log(error.message)
    return res.json([])
  }
}
