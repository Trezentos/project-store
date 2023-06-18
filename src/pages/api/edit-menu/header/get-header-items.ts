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

    const headerItems = await prisma.headerItem.findMany({})

    if (!headerItems)
      return res.status(400).json({ message: 'No header items were found' })

    console.log(headerItems)

    return res.status(201).json(headerItems)
  } catch (error: any) {
    return res.json(error.message)
  }
}
