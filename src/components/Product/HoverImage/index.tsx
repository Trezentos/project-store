import Image, { StaticImageData } from 'next/image'

interface HoverImageProps {
  secondImage: string | StaticImageData | undefined
  colorProductId: string
}

function HoverImage({ colorProductId, secondImage }: HoverImageProps) {
  return (
    <>
      {typeof secondImage !== 'string' ? (
        <video className={`video-${colorProductId}`} muted>
          <source
            // src={secondImage}
            type="video/mp4"
          ></source>
        </video>
      ) : (
        secondImage && (
          <Image
            src={secondImage}
            alt=""
            fill
            sizes="(max-width: 1500px) 420px,
                             (min-width: 1500px) 500px,"
          />
        )
      )}
    </>
  )
}

export default HoverImage
