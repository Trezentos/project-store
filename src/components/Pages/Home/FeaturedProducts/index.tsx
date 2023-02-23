import { CarrouselWrapper, Container } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import imageExp from '../../../../assets/featuredProducts/foto1.jpg'
import image2Exp from '../../../../assets/featuredProducts/foto2.jpg'
import image3Exp from '../../../../assets/featuredProducts/foto3.jpg'

import Product, { IProducts } from './Product'

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
      {props.left && <CaretLeft size={32} />}
      {!props.left && <CaretRight size={32} />}
    </svg>
  )
}

const products: IProducts[] = [
  {
    productId: '302',
    productsByColor: [
      {
        id: '1',
        color: 'purple',
        product: {
          id: '12',
          firstImage: imageExp,
          secondImage: image3Exp,
        },
      },
      {
        id: '2',
        color: 'crimson',
        product: {
          id: '13',
          firstImage: image3Exp,
          secondImage:
            'https://cdn.accentuate.io/6731703976067/9304816484467/PAISLEY_TRIANGLE_TOP_KINSLEY_TIE_SIDE_BOTTOM_PINK_VIDEO_1-v1646637643760.mp4',
        },
      },
    ],
  },
  {
    productId: '36',
    productsByColor: [
      {
        id: '1',
        color: 'green',
        product: {
          id: '12',
          firstImage: imageExp,
          secondImage: image3Exp,
        },
      },
      {
        id: '2',
        color: 'orange',
        product: {
          id: '13',
          firstImage: image3Exp,
          secondImage:
            'https://cdn.accentuate.io/6731703976067/9304816484467/PAISLEY_TRIANGLE_TOP_KINSLEY_TIE_SIDE_BOTTOM_PINK_VIDEO_1-v1646637643760.mp4',
        },
      },
    ],
  },
  {
    productId: '43',
    productsByColor: [
      {
        id: '1',
        color: 'deepskyblue',
        product: {
          id: '12',
          firstImage: imageExp,
          secondImage:
            'https://cdn.accentuate.io/7750966804611/9304816484467/SERENA_TRIANGLE_TOP_SERENA_TANGO_BOTTOM_PINK-v1666397583733.mp4',
        },
      },
      {
        id: '2',
        color: 'crimson',
        product: {
          id: '13',
          firstImage: image3Exp,
          secondImage:
            'https://cdn.accentuate.io/6731703976067/9304816484467/PAISLEY_TRIANGLE_TOP_KINSLEY_TIE_SIDE_BOTTOM_PINK_VIDEO_1-v1646637643760.mp4',
        },
      },
    ],
  },
  {
    productId: '1',
    productsByColor: [
      {
        id: '1',
        color: 'pink',
        product: {
          id: '12',
          firstImage: imageExp,
          secondImage:
            'https://cdn.accentuate.io/7750966804611/9304816484467/SERENA_TRIANGLE_TOP_SERENA_TANGO_BOTTOM_PINK-v1666397583733.mp4',
        },
      },
      {
        id: '2',
        color: 'crimson',
        product: {
          id: '13',
          firstImage: image3Exp,
          secondImage:
            'https://cdn.accentuate.io/6731703976067/9304816484467/PAISLEY_TRIANGLE_TOP_KINSLEY_TIE_SIDE_BOTTOM_PINK_VIDEO_1-v1646637643760.mp4',
        },
      },
    ],
  },
  {
    productId: '2',
    productsByColor: [
      {
        color: 'white',
        id: '1',
        product: {
          id: '3',
          firstImage: image2Exp,
          secondImage:
            'https://cdn.accentuate.io/5192940748931/9304816484467/GLITZY_GIRL_MESH_PEARL_TOP__SKIRT_SET_NUDE-v1666823886592.mp4',
        },
      },
    ],
  },
]

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      //   spacing: 5,
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
        slides: { perView: 1, spacing: 5 },
      },
      '(min-width: 786px)': {
        slides: { perView: 3, spacing: 20 },
      },
      '(min-width: 1500px)': {
        slides: { perView: 4, spacing: 20 },
      },
    },
  })

  return (
    <Container>
      <h2>Items em destaques 😉</h2>
      <CarrouselWrapper>
        <div ref={sliderRef} className="keen-slider">
          {products?.map((product) => {
            return (
              <Product
                key={product.productId}
                productId={product.productId}
                productsByColor={product.productsByColor}
              />
            )
          })}
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
      </CarrouselWrapper>
    </Container>
  )
}
