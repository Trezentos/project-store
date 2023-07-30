import { prisma } from '@/lib/prisma'
import createNewImageAWS from '@/utils/createNewImageAws'
import { Image } from '@prisma/client'

export default async function addImagesToProduct(
  images: Image[],
  productVariationId: string | string[],
) {
  let newImages: Promise<Image>[] = []
  if (images.length > 0) {
    newImages = images.map(async (image) => {
      const newImageAWS = await createNewImageAWS(image)
      const newImage = await prisma.image.create({
        data: {
          name: newImageAWS?.Key,
          originalName: newImageAWS?.originalName,
          imageSrc: newImageAWS?.Location,
          ProductVariation: {
            connect: {
              id: String(productVariationId),
            },
          },
        },
      })

      return newImage
    })
  }

  return await Promise.all(newImages)
}
