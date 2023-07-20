import { prisma } from '@/lib/prisma'
import formToDataFormatter from '@/utils/formToDataFormatter'
import type { NextApiRequest, NextApiResponse } from 'next'
import createNewImageAWS from '@/utils/createNewImageAws'
import deleteOldImageAWS from '@/utils/deleteOldImageAws'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formatToDatabase = (dataToBase: any, device: string) => {
  if (device === 'desktop') {
    return dataToBase
      ? {
          desktopLink: dataToBase.Location,
          desktopKey: dataToBase.Key,
          desktopImageName: dataToBase.originalName,
        }
      : {}
  }

  return dataToBase
    ? {
        mobileLink: dataToBase.Location,
        mobileKey: dataToBase.Key,
        mobileImageName: dataToBase.originalName,
      }
    : {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PATCH') {
      return res.status(405).end()
    }

    const { files, fields } = await formToDataFormatter(req)
    const { newimageFile1, newimageFile2 } = files
    const { backgroundImageId } = fields

    const oldBackgroundHome = await prisma.mainBackgroundHome.findFirst({
      where: {
        id: String(backgroundImageId),
      },
    })

    if (!oldBackgroundHome)
      return res
        .status(400)
        .json('Não foi possível encontrar as imagens antigas para editar')

    const desktopAWSImage = await createNewImageAWS(newimageFile1)
    const mobileAWSImage = await createNewImageAWS(newimageFile2)

    const desktopToUpdate = formatToDatabase(desktopAWSImage, 'desktop')
    const mobileToUpdate = formatToDatabase(mobileAWSImage, 'mobile')

    const updatedBackgroundHome = await prisma.mainBackgroundHome.update({
      where: {
        id: String(backgroundImageId),
      },
      data: {
        ...desktopToUpdate, // can be {content} || {}
        ...mobileToUpdate,
      },
    })

    if (desktopAWSImage) await deleteOldImageAWS(oldBackgroundHome.desktopKey)
    if (mobileAWSImage) await deleteOldImageAWS(oldBackgroundHome.mobileKey)

    return res.status(200).json(updatedBackgroundHome)
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).json(error.message)
  }
}
