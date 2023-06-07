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

    const carrouselImages = await prisma.carrousselImage.findMany()

    return res.status(201).json(carrouselImages)
  } catch (error: any) {
    console.error(error.message)
    return res.json(error.message)
  }
}
