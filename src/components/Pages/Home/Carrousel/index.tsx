import { Container } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { GetStaticProps } from 'next'
import { api } from '@/lib/api'

interface ICarrousselItems {
  id: string
  mobileLink: StaticImageData | string
  desktopLink: StaticImageData | string
  active: boolean
}

interface CarrousselProps {
  carrousselsFromApi: ICarrousselItems[]
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
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
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

export default function Carrousel({ carrousselsFromApi }: CarrousselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: carrousselsFromApi.length > 1,

      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 350000000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  return (
    <>
      <Container className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {carrousselsFromApi.map((image) => (
            <div key={image.id} className="keen-slider__slide">
              <Image
                className="desktop"
                fill
                alt=""
                sizes="100vw, 100vh"
                src={image.desktopLink}
              />
              <Image
                className="mobile"
                fill
                alt=""
                sizes="100vw, 100vh"
                src={image.mobileLink}
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </Container>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            // @ts-ignore
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            )
          })}
        </div>
      )}
    </>
  )
}
