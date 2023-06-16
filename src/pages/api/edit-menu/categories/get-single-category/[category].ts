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

    const category = req.query?.category as string

    const foundCategory = await prisma.productCategory.findFirst({
      where: { hifen: category },
      include: {
        filters: true,
      },
    })

    if (!foundCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    if (!foundCategory.active) {
      return res.status(404).json({ message: 'A categoria foi desativada' })
    }

    return res.status(201).json(foundCategory)
  } catch (error: any) {
    return res.json(error.message)
  }
}
