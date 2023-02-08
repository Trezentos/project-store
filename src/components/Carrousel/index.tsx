import { Container } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import Image1 from '../../assets/carroselimgs/carro1.jpg'
import Image2 from '../../assets/carroselimgs/carro2.jpg'
import Image3 from '../../assets/carroselimgs/carro3.jpg'

import Image1mbl from '../../assets/carroselimgs/carro-mbl-1.jpg'
import Image2mbl from '../../assets/carroselimgs/carro-mbl-2.jpg'
import Image3mbl from '../../assets/carroselimgs/carro-mbl-3.jpg'

interface ICarrousselItems {
  name: string
  mobileSrc: StaticImageData
  desktopSrc: StaticImageData
}

const carrouselImages: ICarrousselItems[] = [
  {
    name: '1',
    desktopSrc: Image1,
    mobileSrc: Image1mbl,
  },
  {
    name: '2',
    desktopSrc: Image2,
    mobileSrc: Image2mbl,
  },
  {
    name: '3',
    desktopSrc: Image3,
    mobileSrc: Image3mbl,
  },
]

const images = [
  { image: Image1, name: '1' },
  { image: Image2, name: '2' },
  { image: Image3, name: '3' },
]

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

export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,

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
          }, 3500)
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
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.map((image) => (
            <div key={image.name} className="keen-slider__slide">
              <Image
                src={image.image}
                fill
                style={{
                  objectFit: 'cover',
                }}
                alt=""
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
      </div>
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
