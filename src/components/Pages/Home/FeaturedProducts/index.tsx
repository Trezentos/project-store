import { CarrouselWrapper, Container } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import imageExp from '../../../../assets/featuredProducts/foto1.jpg'
import image2Exp from '../../../../assets/featuredProducts/foto2.jpg'
import image3Exp from '../../../../assets/featuredProducts/foto3.jpg'
import gifImage from '../../../../assets/giphy.gif'
import curolProductEx from '../../../../assets/product-ex.avif'
import watchProducEx from '../../../../assets/product-ex2.avif'

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

const videoProductEx =
  'https://assets.mixkit.co/videos/preview/mixkit-young-photographer-setting-up-his-camera-outdoors-34408-large.mp4'

const products: IProducts[] = [
  {
    productId: '302',
    productName: 'Saia Estilosa',
    productsByColor: [
      {
        id: '1',
        color: 'purple',
        price: 920,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        price: 120,
        color: 'crimson',
        product: {
          id: '13',
          firstImage: curolProductEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    productId: '36',
    productName: 'Saia Estilosa',
    productsByColor: [
      {
        id: '1',
        color: 'green',
        price: 120,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        color: 'orange',
        price: 580,
        product: {
          id: '13',
          firstImage: curolProductEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    productId: '43',
    productName: 'Saia Estilosa',
    productsByColor: [
      {
        id: '1',
        color: 'deepskyblue',
        price: 820,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        color: 'crimson',
        price: 120,
        product: {
          id: '13',
          firstImage: curolProductEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    productId: '1',
    productName: 'Saia Estilosa',
    productsByColor: [
      {
        id: '1',
        color: 'pink',
        price: 520,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        color: 'crimson',
        price: 320,
        product: {
          id: '13',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
    ],
  },
  {
    productId: '2',
    productName: 'Saia Estilosa',
    productsByColor: [
      {
        color: 'white',
        id: '1',
        price: 580,
        product: {
          id: '3',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
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
                className="keen-slider__slide"
                productName={product.productName}
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
