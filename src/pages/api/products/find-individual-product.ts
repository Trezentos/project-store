import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export interface IProduct {
  id: string
  productColorId: string
  name: string
  description: string
  price: number
  colorName: string
  sizes: string[]
  imagesSrc: { id: string; src: string }[]
  createdAt: string
  availableSizes: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') res.status(405).end()

  const colorId = String(req.query.colorId)
  const productId = String(req.query.productId)

  const selectedProduct = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  })

  const selectedProductColor = await prisma.productColor.findFirst({
    where: {
      id: colorId,
    },
  })

  const selectedImages = await prisma.image.findMany({
    where: {
      product_color_id: selectedProductColor?.id,
    },
  })

  return res.json({
    id: selectedProduct?.id,
    name: selectedProduct?.name,
    price: selectedProductColor?.price,
    description: selectedProduct?.description,
    productColorId: selectedProductColor?.id,
    colorName: selectedProductColor?.colorName,
    sizes: String(selectedProductColor?.availableSizes).split(','),
    imagesSrc: selectedImages.map((image) => ({
      id: image.id,
      src: image.imageSrc,
    })),
  })
}
