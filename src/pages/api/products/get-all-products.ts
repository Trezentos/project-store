import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') res.status(405).end()

    const allProducts = await prisma.product.findMany({})

    const allProductsVariations = await prisma.productVariation.findMany({
      include: {
        Image: true,
        category: true,
      },
    })

    const formattedProductsVariations = allProductsVariations.map((item) => ({
      ...item,
      productId: item.product_id,
      images: item.Image.map((imageItem) => ({
        id: imageItem.id,
        imageSrc: imageItem.imageSrc,
        originalName: imageItem.originalName,
        name: imageItem.name,
      })),
      categoriesOptions: item.category.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    }))

    return res
      .status(200)
      .json({ allProducts, allProductsVariations: formattedProductsVariations })
  } catch (err: any) {
    console.log(err.message)
    return res.status(400).json(err.message)
  }
}
