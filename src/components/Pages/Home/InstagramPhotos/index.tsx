import {
  ArrowContainer,
  CarrouselWrapper,
  ImageContainer,
  InstagramContainer,
} from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import { CaretLeft, CaretRight, InstagramLogo } from 'phosphor-react'
import imageExp from '../../assets/featuredProducts/foto1.jpg'
import image2Exp from '../../assets/featuredProducts/foto2.jpg'
import image3Exp from '../../assets/featuredProducts/foto3.jpg'
import Image from 'next/image'

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

interface HomeProps {
  instagramPhotos: {
    imageSrc: string
  }[]
}

export default function InstagramSession(props: HomeProps) {
  const { instagramPhotos } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
    },
    loop: true,

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(max-width: 786px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 786px)': {
        slides: { perView: 6, spacing: 5 },
      },
      '(min-width: 1500px)': {
        slides: { perView: 8, spacing: 5 },
      },
    },
  })

  return (
    <InstagramContainer>
      <InstagramLogo size={48} />
      <h1>Instagram items</h1>
      <CarrouselWrapper>
        <div ref={sliderRef} className="keen-slider">
          {instagramPhotos?.map((photoItem) => {
            return (
              <ImageContainer
                key={photoItem.imageSrc}
                className="keen-slider__slide"
              >
                <Image
                  src={photoItem.imageSrc}
                  alt=""
                  width={240}
                  height={240}
                />
                <InstagramLogo size={24} />
              </ImageContainer>
            )
          })}
        </div>
        {loaded && instanceRef.current && (
          <ArrowContainer
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className="arrow-insta-container"
          >
            <Arrow
              disabled={
                currentSlide ===
                instanceRef.current.track.details?.slides.length - 1
              }
            />
          </ArrowContainer>
        )}
      </CarrouselWrapper>
    </InstagramContainer>
  )
}
