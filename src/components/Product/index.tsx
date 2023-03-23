import Image, { StaticImageData } from 'next/image'
import { Container, Description, Colors, Dot, ContentWrapper } from './styles'
import imageExp from '../../../assets/featuredProducts/foto1.jpg'
import { useCallback, useEffect, useState } from 'react'
import realFormatter from '@/utils/realFormatter'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

interface IProduct {
  id: string
  firstImage: StaticImageData
  secondImage?: string | StaticImageData
}

interface IProductsPerColor {
  id: string
  color: string
  price: number
  product: IProduct
}

export interface IProducts {
  productId: string
  productName: string
  productsByColor: IProductsPerColor[]
  className?: string
}

export default function Product({
  productsByColor,
  productId,
  className,
  productName,
}: IProducts) {
  const [selectedProduct, setSelectedProduct] = useState<IProductsPerColor>(
    productsByColor[0],
  )

  const handleActiveProduct = useCallback(
    (product: IProductsPerColor, currentElement: HTMLElement | null) => {
      setSelectedProduct(product)

      const selectedProducts = document.querySelectorAll(
        `.wrapper-${productId} .product-item-slider`,
      )

      const productElementToActive = document.querySelector(
        `.wrapper-${productId} [id='${product.product.id}']`,
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
  }, [productId, productsByColor])

  return (
    <Container className={className}>
      <ContentWrapper className={`wrapper-${productId}`}>
        {productsByColor.map((productByColor, index) => {
          const { product } = productByColor
          console.log(product)

          return (
            <Link
              href={`individualProduct/[id]/[color]`}
              as={`individualProduct/${productByColor.id}/${selectedProduct.color}`}
              key={product.id}
            >
              <div
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
            </Link>
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
                  handleActiveProduct(productColor, e.currentTarget)
                }
              />
            )
          })}
        </Colors>
        <Link
          href={`individualProduct/${selectedProduct.id}/${selectedProduct.color}`}
        >
          <strong>{productName}</strong>
          <h5>{realFormatter(selectedProduct.price)}</h5>
        </Link>
      </Description>
    </Container>
  )
}
