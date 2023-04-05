import { FC } from 'react'
import Image, { ImageProps } from 'next/image'
import { Container } from './styles'

interface SkeletonImageProps extends Omit<ImageProps, 'placeholder'> {
  isLoading: boolean
}

export const SkeletonImage: FC<SkeletonImageProps> = ({
  isLoading,
  src,
  alt,
  width,
  height,
}) => {
  return (
    <Container className="skeleton">
      {isLoading ? (
        <div className="skeleton-image"></div>
      ) : (
        <Image src={src} alt={alt} width={width} height={height} />
      )}
    </Container>
  )
}
