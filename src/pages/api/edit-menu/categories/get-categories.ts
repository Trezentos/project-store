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

    const categories = await prisma.productCategory.findMany({
      include: {
        filters: true,
      },
    })

    if (!categories)
      return res.status(400).json({ message: 'No categories were found' })

    return res.status(201).json(categories)
  } catch (error: any) {
    console.log(error.message)
    return res.json([])
  }
}
