import { prisma } from '@/lib/prisma'
import { Product, ProductVariation } from '@prisma/client'

export default async function formatProduct(
  product: Product & {
    ProductVariation: ProductVariation[]
  },
  productVariationId: string | string[],
) {
  const images = await prisma.image.findMany({
    where: {
      ProductVariation: {
        some: {
          id: String(productVariationId),
        },
      },
    },
  })

  const productVariation = product.ProductVariation.find(
    (item) => item.id === productVariationId,
  )

  const categoriesOptions = await prisma.productCategory.findMany({
    where: {
      productVariation: {
        some: {
          id: String(productVariationId),
        },
      },
    },
  })

  if (!productVariation) throw new Error('Produto não encontrado')

  return {
    id: product.id,
    name: product.name,
    price: productVariation.price,
    productVariationId,
    colorHex: productVariation.colorHex,
    colorName: productVariation.colorName,
    description: productVariation.description,
    quantity: productVariation.quantity,
    images: images.map((image) => ({
      id: image.id,
      imageSrc: image.imageSrc,
      name: image.name,
      originalName: image.originalName,
    })),
    categoriesOptions: categoriesOptions.map((category) => ({
      label: category.name,
      value: category.id,
    })),
    categories: categoriesOptions.map((category) => ({
      name: category.name,
      id: category.id,
    })),
  }
}
