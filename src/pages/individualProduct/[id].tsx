import SiteAdvantageBlock from '@/components/Pages/Home/SiteAdvantagesBlock'
import AccordeonDetail from '@/components/Pages/IndividualProduct/AccordeonDetail'
import ImagesSlider from '@/components/Pages/IndividualProduct/ImagesSlider'
import PropertiesProduct from '@/components/Pages/IndividualProduct/PropertiesProductColor'
import PropertiesProductSize from '@/components/Pages/IndividualProduct/PropertiesProductSize'
import { CartContext } from '@/contexts/CartContext'
import { api } from '@/lib/axios'
import prisma from '@/lib/prisma'
import { IProduct } from '@/pages/api/products/find-individual-product'
import realFormatter from '@/utils/realFormatter'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'

import {
  Breadcrumb,
  Container,
  ProductProperties,
  MainContent,
} from '../../styles/individualProduct'

export interface ColorOptionType {
  hexName: string
  name: string
  id: string
}

interface IndividualProductProps {
  product: IProduct
  colorOptions: ColorOptionType[]
}

export default function IndividualProduct({
  product,
  colorOptions,
}: IndividualProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(product)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes[0],
  )
  const [selectedColor, setSelectedColor] = useState<ColorOptionType>(() => {
    const color = colorOptions.find((item) => item.name === product.colorName)
    if (!color) return { hexName: '#fff', id: '-1', name: 'not found' }

    return color
  })

  const { addProductToCart } = useContext(CartContext)

  const updateProduct = useCallback(
    async (productId: string, colorId: string) => {
      try {
        const { data } = await api.get(`/products/find-individual-product`, {
          params: {
            productId,
            colorId,
          },
        })

        setSelectedProduct(data)
      } catch (error) {
        alert('não foi possível trocar de produto.')
      }
    },
    [],
  )

  const changeColor = useCallback(
    (colorOpt: ColorOptionType) => {
      setSelectedColor(colorOpt)
      updateProduct(product.id, colorOpt.id)
    },
    [product.id, updateProduct],
  )

  const changeSize = useCallback((size: string) => {
    setSelectedSize(size)
  }, [])

  const handleAddToCart = useCallback(() => {
    addProductToCart({
      ...selectedProduct,
      selectedSize,
    })
  }, [addProductToCart, selectedProduct, selectedSize])

  useEffect(() => {
    changeSize(selectedProduct.sizes[0])
  }, [changeSize, selectedProduct])

  return (
    <Container>
      <Breadcrumb>
        <Link href={'/products'}>Produtos</Link>
        <p>{selectedProduct.name}</p>
      </Breadcrumb>

      <MainContent>
        <ImagesSlider images={selectedProduct.imagesSrc} />
        <ProductProperties>
          <h2>{selectedProduct.name}</h2>
          <h5>{realFormatter(selectedProduct.price)}</h5>
          <PropertiesProduct
            type="color"
            colorOptions={colorOptions}
            changeColor={changeColor}
            selectedColor={selectedColor}
          />
          {selectedProduct.sizes.length > 0 && (
            <PropertiesProductSize
              sizeOptions={selectedProduct.sizes}
              changeSize={changeSize}
              selectedSize={selectedSize}
            />
          )}
          <Link href={'/sizes'}>Consultar tamanhos</Link>
          <button onClick={handleAddToCart} type="button">
            Adicionar ao Carrinho
          </button>

          <AccordeonDetail bodyText={selectedProduct.description} />
        </ProductProperties>
      </MainContent>
      <SiteAdvantageBlock />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'a1024a97-66f6-4d37-ad9e-6620b939d478',
          // color: 'purple',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedProductColor = await prisma.productColor.findFirst({
    where: {
      id: String(params?.id),
    },
  })

  const selectedProduct = await prisma.product.findFirst({
    where: {
      id: selectedProductColor?.product_id,
    },
  })

  const selectedImages = await prisma.image.findMany({
    where: {
      product_color_id: selectedProductColor?.id,
    },
  })

  // List all products colors
  const colorOptionsFromApi = await prisma.productColor.findMany({
    where: {
      product_id: String(selectedProduct?.id),
    },
  })

  return {
    props: {
      product: {
        id: selectedProduct?.id,
        productColorId: selectedProductColor?.id,
        name: selectedProduct?.name,
        price: selectedProductColor?.price,
        description: selectedProduct?.description,
        sizes:
          selectedProductColor?.availableSizes !== null
            ? String(selectedProductColor?.availableSizes).split(',')
            : [],
        colorName: selectedProductColor?.colorName,
        imagesSrc: selectedImages.map((image) => ({
          id: image.id,
          src: image.imageSrc,
        })),
      },
      colorOptions: colorOptionsFromApi.map((productItem) => ({
        hexName: productItem.colorHex,
        name: productItem.colorName,
        id: productItem.id,
      })),
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
