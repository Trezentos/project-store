import {
  ArrowContainer,
  CarrouselWrapper,
  ImageContainer,
  InstagramContainer,
} from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState, useContext, useEffect } from 'react'
import { CaretLeft, CaretRight, InstagramLogo } from 'phosphor-react'
import Image from 'next/image'
import InstaModal from './Modal'
import { InstagramContext } from '@/contexts/pages/home/InstagramContext'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { SkeletonImage } from './skeletonImage'
import { useRouter } from 'next/router'

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

export interface InstagramPostProps {
  imageSrc: string
  id: string
  description: string
  timestamp: string
}

interface HomeProps {
  instagramMedias: InstagramPostProps[]
}

export default function InstagramSession(props: HomeProps) {
  const { instagramMedias } = props
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
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
  const router = useRouter()
  const isLoading = router.isFallback

  const { updateSelectedModalMedia, updatesInstagramMedias } =
    useContext(InstagramContext)

  function openModal(instagramMediaItem: InstagramPostProps) {
    setIsOpen(true)
    updateSelectedModalMedia(instagramMediaItem)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    updatesInstagramMedias(instagramMedias)
  }, [instagramMedias, updatesInstagramMedias])

  return (
    <InstagramContainer>
      <InstagramLogo size={48} />
      <h1>Instagram items</h1>
      <CarrouselWrapper>
        <div ref={sliderRef} className="keen-slider">
          {instagramMedias.map((instagramMediaItem) => {
            return (
              <ImageContainer
                key={instagramMediaItem.imageSrc}
                className="keen-slider__slide"
                onClick={() => openModal(instagramMediaItem)}
              >
                {/* <Image
                  src={instagramMediaItem.imageSrc}
                  alt=""
                  width={240}
                  height={240}
                /> */}
                <SkeletonImage
                  alt=""
                  width={240}
                  height={240}
                  src={instagramMediaItem.imageSrc}
                  isLoading={isLoading}
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
      <InstaModal isOpen={modalIsOpen} closeModal={closeModal} />
    </InstagramContainer>
  )
}
