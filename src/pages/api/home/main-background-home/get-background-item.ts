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

    const backgroundHome = await prisma.mainBackgroundHome.findFirst()

    return res.status(201).json(backgroundHome)
  } catch (err: any) {
    console.log(err.message)
    return res.status(400).json('Não foi possível carregar o conteúdo')
  }
}
