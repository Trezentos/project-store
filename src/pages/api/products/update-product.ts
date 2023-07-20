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
      productId,
      productVariationId,
      color,
      description,
      name,
      price,
      quantity,
      colorHex,
    } = fields

    const images = getArrayFrom('images', files)
    const categories = getArrayFrom('categories', fields)

    await addImagesToProduct(images, productVariationId)

    const { categoriesToConnect, categoriesToDisconnect } =
      await connectAndDisconnectCategories(categories)

    const updatedProduct = await prisma.product.update({
      include: {
        ProductVariation: true,
      },
      where: {
        id: String(productId),
      },
      data: {
        name: String(name),
        ProductVariation: {
          update: {
            where: {
              id: String(productVariationId),
            },
            data: {
              price: Number(price) * 100,
              colorName: String(color),
              description: String(description),
              colorHex: String(colorHex),
              quantity: Number(quantity),
              category: {
                connect: categoriesToConnect,
                disconnect: categoriesToDisconnect,
              },
            },
          },
        },
      },
    })

    const formattedProduct = await formatProduct(
      updatedProduct,
      productVariationId,
    )

    return res.status(200).json(formattedProduct)
  } catch (error: any) {
    console.log(error.message)
    return res.json(error.message)
  }
}
