import { prisma } from '@/lib/prisma'

const colorContent = [
  {
    color: 'purple',
    id: 1,
  },
  {
    color: 'red',
    id: 2,
  },
  {
    color: 'blue',
    id: 3,
  },
  {
    color: 'crimson',
    id: 4,
  },
  {
    color: 'pink',
    id: 5,
  },
  {
    color: 'gray',
    id: 6,
  },
  {
    color: 'brown',
    id: 7,
  },
  {
    color: 'deepskyblue',
    id: 8,
  },
  {
    color: 'yellow',
    id: 9,
  },
  {
    color: 'orange',
    id: 12,
  },
  {
    color: 'aliceblue',
    id: 354,
  },
]

export default async function getManyProducts(categorie?: string) {
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

  return { allProducts: formattedProducts, colorContent }
}
