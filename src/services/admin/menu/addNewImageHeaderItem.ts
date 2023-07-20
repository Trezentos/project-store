import { prisma } from '@/lib/prisma'
import createNewImageAWS from '@/utils/createNewImageAws'
import formidable from 'formidable'

export async function addNewImageHeaderItem({
  imageFile,
  categoryId: newCategoryId,
}: {
  categoryId: string | string[]
  imageFile: formidable.File | formidable.File[] | undefined
}) {
  if (!imageFile) return {}

  const newImage = await createNewImageAWS(imageFile)

  if (!newImage) throw new Error('Não foi possível criar a imagem')

  const category = await prisma.productCategory.findFirst({
    where: { id: String(newCategoryId) },
  })

  if (!category)
    throw new Error('Não foi possível encontrar a categoria selecionada')

  return {
    backgroundImageLink: newImage.Location,
    backgroundImageName: newImage.Key,
    backgroundImageLinkTo: category.hifen,
    backgroundImageOriginalName: newImage.originalName,
  }
}
