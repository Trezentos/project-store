import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') res.status(405).end()

    const { name } = req.query

    const foundProducts = await prisma.product.findMany({
      where: {
        name: {
          contains: String(name),
        },
      },
    })

    return res.status(200).json(foundProducts)
  } catch (err: any) {
    console.log(err.message)
    return res.status(400).json(err.message)
  }
}
