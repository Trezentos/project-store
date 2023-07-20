import { prisma } from '@/lib/prisma'
import createNewImageAWS from '@/utils/createNewImageAws'

export default async function addImagesToProduct(
  images: any[],
  productVariationId: string | string[],
) {
  if (images.length > 0) {
    images.forEach(async (image) => {
      const newImage = await createNewImageAWS(image)
      await prisma.image.create({
        data: {
          name: newImage?.Key,
          originalName: newImage?.originalName,
          imageSrc: newImage?.Location,
          ProductVariation: {
            connect: {
              id: String(productVariationId),
            },
          },
        },
      })
    })
  }
}
