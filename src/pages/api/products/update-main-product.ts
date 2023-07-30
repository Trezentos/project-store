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
    bodyParser: true,
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

    const { name, id } = req.body

    const product = await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        name: String(name),
      },
    })

    if (!product) {
      throw new Error('Não foi possível editar o produto')
    }

    return res.status(200).json(product)
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
