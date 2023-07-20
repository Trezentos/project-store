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

    const formattedProducts = allProductsVariations.map((productV) => {
      const mainProduct = allProducts.find(
        (product) => product.id === productV.product_id,
      )
      return {
        ...mainProduct,
        productVariationId: productV.id,
        images: productV.Image,
        price: productV.price / 100,
        colorHex: productV.colorHex,
        colorName: productV.colorName,
        availableSizes: productV.availableSizes,
        description: productV.description,
        quantity: productV.quantity,
        categories: productV.category
          .filter((item) => item.active)
          .map((item) => {
            return {
              name: item.name,
              id: item.id,
            }
          }),
      }
    })

    return res.status(201).json(formattedProducts)
  } catch (err: any) {
    console.log(err.message)
    return res.status(400).json(err.message)
  }
}
