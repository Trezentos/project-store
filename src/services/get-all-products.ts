import { prisma } from '@/lib/prisma'

export default async function getAllProducts() {
  const allProductsRaw = await prisma.product.findMany()

  const allProductsColors = await prisma.productColor.findMany()

  const allImages = await prisma.image.findMany()

  const allProducts = allProductsRaw.map((product) => {
    return {
      ...product,
      productsByColor: allProductsColors
        .filter((productsColor) => productsColor.product_id === product.id)
        .map((item) => ({
          ...item,
          productsImages: allImages.filter(
            (actualImage) => actualImage.product_color_id === item.id,
          ),
        })),
    }
  })

  const formattedProducts = allProducts.map((product) => {
    return {
      id: product.id,
      productName: product.name,
      productDescription: product.description,
      productsByColor: product.productsByColor.map((productColor) => ({
        id: productColor.id,
        colorName: productColor.colorName,
        colorHex: productColor.colorHex,
        price: productColor.price,
        productImages: productColor.productsImages.map((prodImage) => ({
          id: prodImage.id,
          imageSrc: prodImage.imageSrc,
        })),
      })),
    }
  })

  return formattedProducts
}
