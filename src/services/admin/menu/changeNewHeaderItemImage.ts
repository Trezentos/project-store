import createNewImageAWS from '@/utils/createNewImageAws'
import formidable from 'formidable'

export default async function changeNewHeaderItemImage({
  imageFile,
  linkToImage,
  isToChange,
}: {
  imageFile: formidable.File | formidable.File[]
  isToChange: boolean
  linkToImage: string
}) {
  if (!isToChange) return {}
  let newImageFormatted = {}
  const newImage = await createNewImageAWS(imageFile)
  newImageFormatted = newImage
    ? {
        backgroundImageName: newImage.Key,
        backgroundImageLink: newImage.Location,
        backgroundImageLinkTo: linkToImage,
      }
    : {
        backgroundImageName: null,
        backgroundImageLink: null,
        backgroundImageLinkTo: null,
      }

  return newImageFormatted
}

// changeImageBoolean === 'true'
