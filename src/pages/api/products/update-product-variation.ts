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
    if (req.method !== 'PUT') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)

    const {
      productVariationId,
      productId,
      quantity,
      color,
      description,
      price,
      colorHex,
    } = fields

    const images = getArrayFrom('images', files)
    const categories = getArrayFrom('categories', fields)

    console.log('price: ', price)

    await addImagesToProduct(images, productVariationId)

    const { categoriesToConnect, categoriesToDisconnect } =
      await connectAndDisconnectCategories(categories)

    const editedProduct = await prisma.productVariation.update({
      where: {
        id: String(productVariationId),
      },
      data: {
        quantity: Number(quantity),
        colorName: String(color),
        description: String(description),
        price: Number(price),
        colorHex: String(colorHex),
        category: {
          connect: categoriesToConnect,
          disconnect: categoriesToDisconnect,
        },
      },
      include: {
        Image: true,
        category: true,
      },
    })

    const formattedProduct = {
      ...editedProduct,
      productId: editedProduct.product_id,
      images: editedProduct.Image.map((image) => ({
        ...image,
      })),
      categoriesOptions: editedProduct.category.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    }

    return res.status(200).json(formattedProduct)
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
