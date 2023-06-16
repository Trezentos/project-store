import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const categories = await prisma.productCategory.findMany({
      include: {
        filters: true,
      },
    })

    if (!categories)
      return res.status(400).json({ message: 'No categories were found' })

    const activeCategories = categories.filter((item) => item.active)

    return res.status(201).json(activeCategories)
  } catch (error: any) {
    return res.json(error.message)
  }
}
