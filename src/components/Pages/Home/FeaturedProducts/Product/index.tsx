import Image, { StaticImageData } from 'next/image'
import { Container, Description, Colors, Dot, ContentWrapper } from './styles'
import imageExp from '../../../assets/featuredProducts/foto1.jpg'
import { useCallback, useEffect } from 'react'

interface IProduct {
  id: string
  firstImage: StaticImageData
  secondImage?: string | StaticImageData
}

interface IProductsPerColor {
  id: string
  color: string
  product: IProduct
}

export interface IProducts {
  productId: string
  productsByColor: IProductsPerColor[]
}

export default function Product({ productsByColor, productId }: IProducts) {
  useEffect(() => {
    const wrapperDiv = document.querySelector<HTMLDivElement>(
      `.wrapper-${productId}`,
    )

    wrapperDiv?.addEventListener('mouseover', async (e) => {
      try {
        const videoToPlay = document.querySelector<HTMLVideoElement>(
          `.wrapper-${productId} .active video`,
        )

        if (!videoToPlay) return
        videoToPlay.currentTime = 0
        await videoToPlay.play()
      } catch (error: any) {
        console.error(error.message)
      }
    })
  }, [productId])

  const handleActiveProduct = useCallback(
    (id: string, currentElement: HTMLElement | null) => {
      const selectedProducts = document.querySelectorAll(
        `.wrapper-${productId} .product-item-slider`,
      )

      const productElementToActive = document.querySelector(
        `.wrapper-${productId} [id='${id}']`,
      )
      selectedProducts.forEach((productElement) => {
        productElement.classList.remove('active')
      })

      productElementToActive?.classList.add('active')

      currentElement?.parentElement?.childNodes.forEach((element) => {
        // @ts-ignore
        element.classList.remove('active')
      })

      currentElement?.classList.add('active')
    },
    [productId],
  )

  return (
    <Container className="keen-slider__slide">
      <ContentWrapper className={`wrapper-${productId}`}>
        {productsByColor.map((productByColor, index) => {
          const { product } = productByColor
          return (
            <div
              key={product.id}
              id={product.id}
              className={`product-item-slider ${index === 0 ? 'active' : ''}`}
            >
              <Image
                src={product.firstImage}
                alt=""
                fill
                sizes="(max-width: 1500px) 450px,
                      (min-width: 1500px) 530px,"
              />
              {typeof product.secondImage === 'string' ? (
                <video className={`video-${productId}`} muted>
                  <source src={product.secondImage} type="video/mp4"></source>
                </video>
              ) : (
                product.secondImage && (
                  <Image
                    src={product.secondImage}
                    alt=""
                    fill
                    sizes="(max-width: 1500px) 420px,
                    (min-width: 1500px) 500px,"
                  />
                )
              )}
            </div>
          )
        })}
      </ContentWrapper>
      <Description>
        <Colors className="dots-selector">
          {productsByColor.map((productColor, index) => {
            return (
              <Dot
                key={productColor.id}
                dotColor={productColor.color}
                className={`product-color-id-${productColor.id} ${
                  index === 0 ? 'active' : ''
                }`}
                onClick={(e) =>
                  handleActiveProduct(productColor.product.id, e.currentTarget)
                }
              />
            )
          })}
        </Colors>
        <strong>LISA PUSH UP TOP</strong>
        <h5>R$ 1.050</h5>
      </Description>
    </Container>
  )
}
