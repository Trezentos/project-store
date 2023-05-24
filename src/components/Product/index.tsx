import Image, { StaticImageData } from 'next/image'
import { Container, Description, ContentWrapper } from './styles'
import imageExp from '../../../assets/featuredProducts/foto1.jpg'
import { useCallback, useEffect, useState } from 'react'
import realFormatter from '@/utils/realFormatter'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import HoverImage from './HoverImage'
import ColorsSelection from './ColorList'

interface IProductImages {
  id: string
  imageSrc: string | StaticImageData
}

export interface IProductsPerColor {
  id: string
  colorName: string
  colorHex: string
  price: number
  productImages: IProductImages[]
}

export interface IProduct {
  id: string
  productName: string
  productDescription: string
  productsByColor: IProductsPerColor[]
  className?: string
}

interface ProductProps {
  generalInfo: {
    id: string
    productName: string
  }
  productsByColor: IProductsPerColor[]
  className?: string
}

export default function Product({
  productsByColor,
  generalInfo,
  className,
}: ProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProductsPerColor>(
    productsByColor[0],
  )

  const handleActiveProduct = useCallback(
    (product: IProductsPerColor, currentElement: HTMLElement | null) => {
      setSelectedProduct(product)

      if (!generalInfo.id) return

      const selectedProducts = document.querySelectorAll(
        `.wrapper-${generalInfo.id} .product-item-slider`,
      )

      const productElementToActive = document.querySelector(
        `.wrapper-${generalInfo.id} [id='${product.productImages[0].id}']`,
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
    [generalInfo],
  )

  useEffect(() => {
    const wrapperDiv = document.querySelector<HTMLDivElement>(
      `.wrapper-${generalInfo.id}`,
    )

    wrapperDiv?.addEventListener('mouseover', async (e) => {
      try {
        const videoToPlay = document.querySelector<HTMLVideoElement>(
          `.wrapper-${generalInfo.id} .active video`,
        )

        if (!videoToPlay) return
        videoToPlay.currentTime = 0
        await videoToPlay.play()
      } catch (error: any) {
        console.error(error.message)
      }
    })
  }, [productsByColor, generalInfo])

  return (
    <Container className={className}>
      <ContentWrapper className={`wrapper-${generalInfo?.id}`}>
        {productsByColor.map((colorProduct, index) => {
          const { productImages } = colorProduct

          console.log(selectedProduct?.id)

          return (
            <Link
              key={colorProduct.id}
              as={`individualProduct/${selectedProduct?.id}`}
              href={`individualProduct/[id]`}
            >
              <div
                id={colorProduct.productImages[0]?.id}
                className={`product-item-slider ${index === 0 ? 'active' : ''}`}
              >
                <Image
                  src={productImages[0]?.imageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 1500px) 450px,
                    (min-width: 1500px) 530px,"
                />
                <HoverImage
                  secondImage={productImages[1]?.imageSrc}
                  colorProductId={colorProduct?.id}
                />
              </div>
            </Link>
          )
        })}
      </ContentWrapper>
      <Description>
        <ColorsSelection
          handleActiveProduct={handleActiveProduct}
          productsColors={productsByColor}
        />
        <Link href={`individualProduct/${selectedProduct?.id}`}>
          <strong>{generalInfo?.productName}</strong>
          <h5>{realFormatter(selectedProduct?.price)}</h5>
        </Link>
      </Description>
    </Container>
  )
}
