import Image, { StaticImageData } from 'next/image'
import { ImageContainer } from './styles'

interface SubItemsHighlightImageProps {
  imageUrl?: StaticImageData
  name: string
  linkTo?: string
}

export default function SubItemsHighlightImage({
  imageUrl,
  linkTo,
  name,
}: SubItemsHighlightImageProps) {
  return (
    (imageUrl && (
      <ImageContainer href={`/categories/${linkTo}`}>
        <Image src={imageUrl} alt="" height={350} width={250} />
        <p>{name}</p>
      </ImageContainer>
    )) || <></>
  )
}
