import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { formatHeaderItemObject } from '@/services/admin/menu/formatHeaderItemsArray'
import formToDataFormatter from '@/utils/formToDataFormatter'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'
import changeNewHeaderItemImage from '@/services/admin/menu/changeNewHeaderItemImage'

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
    const { imageFile } = files
    const { headerItemId, headerItemName, newCategoryId, changeImageBoolean } =
      fields
    const isToChangeImage = changeImageBoolean === 'true'

    const newCategory = await prisma.productCategory.findFirst({
      where: {
        id: String(newCategoryId),
      },
    })

    if (!newCategory) {
      return res.status(405).json({ message: 'Categoria não encontrada' })
    }

    const oldHeaderItem = await prisma.headerItem.findFirst({
      where: {
        id: String(headerItemId),
      },
    })

    if (!oldHeaderItem) {
      return res
        .status(405)
        .json({ message: 'Item do cabeçalho não encontrado' })
    }

    const returnedObjectImage = await changeNewHeaderItemImage({
      imageFile,
      linkToImage: newCategory.hifen,
      isToChange: isToChangeImage,
    })

    if (isToChangeImage)
      await deleteOldImageAWS(oldHeaderItem.backgroundImageName)

    const updatedHeaderItem = await prisma.headerItem.update({
      where: {
        id: String(headerItemId),
      },
      data: {
        name: String(headerItemName),
        category_id: String(newCategoryId),
        ...returnedObjectImage,
      },
      include: {
        HeaderSubItem: true,
      },
    })

    const formatedHeaderItem = formatHeaderItemObject(
      updatedHeaderItem,
      newCategory,
    )

    return res.status(200).json(formatedHeaderItem)
  } catch (error: any) {
    console.log(error.message)
    return res.json(error.message)
  }
}
