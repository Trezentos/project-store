import { CarrouselWrapper, Container } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import curolProductEx from '../../../../assets/product-ex.avif'
import watchProducEx from '../../../../assets/product-ex2.avif'
import curol2ProducEx from '../../../../assets/product-ex3.avif'

import Product, { IProduct } from '../../../Product'

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

const products: IProduct[] = [
  {
    id: '302',
    productName: 'Creme Curology',
    productsByColor: [
      {
        id: '1',
        colorName: 'purple',
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
        colorName: 'crimson',
        product: {
          id: '13',
          firstImage: curol2ProducEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    id: '36',
    productName: 'Creme Curology 1',
    productsByColor: [
      {
        id: '1',
        colorName: 'green',
        price: 120,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        colorName: 'orange',
        price: 580,
        product: {
          id: '13',
          firstImage: curol2ProducEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    id: '43',
    productName: 'Creme Curology 2',
    productsByColor: [
      {
        id: '1',
        colorName: 'deepskyblue',
        price: 820,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        colorName: 'crimson',
        price: 120,
        product: {
          id: '13',
          firstImage: curol2ProducEx,
          secondImage: watchProducEx,
        },
      },
    ],
  },
  {
    id: '1',
    productName: 'Creme Curology 3',
    productsByColor: [
      {
        id: '1',
        colorName: 'pink',
        price: 520,
        product: {
          id: '12',
          firstImage: curolProductEx,
          secondImage: videoProductEx,
        },
      },
      {
        id: '2',
        colorName: 'crimson',
        price: 320,
        product: {
          id: '13',
          firstImage: curol2ProducEx,
          secondImage: videoProductEx,
        },
      },
    ],
  },
  {
    id: '2',
    productName: 'Creme Curology 4',
    productsByColor: [
      {
        colorName: 'white',
        id: '1',
        price: 580,
        product: {
          id: '3',
          firstImage: curol2ProducEx,
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
                key={product.id}
                id={product.id}
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
