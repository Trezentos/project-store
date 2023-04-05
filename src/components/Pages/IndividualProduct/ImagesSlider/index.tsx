import { useKeenSlider } from 'keen-slider/react'
import Image, { StaticImageData } from 'next/image'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ArrowContainer, ImageContainer, ImagesDemo } from './styles'

interface imagesSliderProps {
  images: { id: string; src: string }[]
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick?: (e: any) => void
}) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <CaretLeft size={32} />}
      {!props.left && <CaretRight size={32} />}
    </svg>
  )
}

export default function ImagesSlider({ images }: imagesSliderProps) {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderConfig = {
    slides: {
      perView: 2,
    },
    loop: true,

    slideChanged(slider: any) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(max-width: 786px)': {
        slides: { perView: 1, spacing: 5 },
      },
      '(min-width: 786px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1500px)': {
        slides: { perView: 2, spacing: 5 },
      },
    },
  }
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderConfig)

  useEffect(() => {
    instanceRef.current?.update(sliderConfig)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, instanceRef])

  return (
    <ImagesDemo ref={sliderRef} className="keen-slider">
      {images.map((imageItem) => {
        return (
          <ImageContainer className="keen-slider__slide" key={imageItem.id}>
            <Image src={imageItem.src} alt="" fill sizes="80vh, 200px" />
          </ImageContainer>
        )
      })}
      {loaded && instanceRef.current && (
        <ArrowContainer>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
          <Arrow
            disabled={
              currentSlide ===
              instanceRef.current.track.details?.slides.length - 1
            }
            onClick={(e: any) => {
              // instanceRef.current?.update({}, 1)

              e.stopPropagation() || instanceRef.current?.next()
            }}
          />
        </ArrowContainer>
      )}
    </ImagesDemo>
  )
}
