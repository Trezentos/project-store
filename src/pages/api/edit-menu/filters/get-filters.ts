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

    const filters = await prisma.productFilter.findMany({})

    if (!filters)
      return res.status(400).json({ message: 'No categories were found' })

    return res.status(201).json(filters)
  } catch (error: any) {
    return res.json(error.message)
  }
}
