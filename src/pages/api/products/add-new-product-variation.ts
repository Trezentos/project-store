import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { formatHeaderItemObject } from '@/services/admin/menu/formatHeaderItemsArray'
import formToDataFormatter from '@/utils/formToDataFormatter'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'
import changeNewHeaderItemImage from '@/services/admin/menu/changeNewHeaderItemImage'
import getArrayFrom from '@/utils/getArrayFrom'
import connectAndDisconnectCategories from '@/services/admin/products/connectAndDisconnectCategories'
import formatProduct from '@/services/admin/products/formatProduct'
import addImagesToProduct from '@/services/admin/products/addImagesToProduct'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)

    const { colorName, colorHex, description, price, quantity, productId } =
      fields

    const images = getArrayFrom('images', files)
    const categories = getArrayFrom('categories', fields)

    const { categoriesToConnect } = await connectAndDisconnectCategories(
      categories,
    )

    const newProductVariation = await prisma.productVariation.create({
      include: {
        product: true,
        category: true,
        Image: true,
      },
      data: {
        colorHex: String(colorHex),
        colorName: String(colorName),
        description: String(description),
        price: Number(price),
        quantity: Number(quantity),
        product: {
          connect: {
            id: String(productId),
          },
        },
        category: {
          connect: categoriesToConnect,
        },
      },
    })

    const newImages = await addImagesToProduct(images, newProductVariation.id)

    const formattedProductVariation = {
      ...newProductVariation,
      productId: newProductVariation.product_id,
      categoriesOptions: newProductVariation.category.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      images: newImages.map((image) => image),
    }

    return res.status(200).json(formattedProductVariation)
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
