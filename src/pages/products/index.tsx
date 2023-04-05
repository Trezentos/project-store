import { InstagramContext } from '@/contexts/pages/home/InstagramContext'
import Image from 'next/image'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  AsideFilterContainer,
  AsideFilterContainerBGMobile,
  Banner,
  BodyContent,
  Breadcrumb,
  Container,
  FilterLayout,
  Header,
  PaginationContainer,
  ProductsContainer,
} from './styles'
import BannerImage from './banner.jpg'
import Link from 'next/link'
import { CaretLeft, CaretRight, List } from 'phosphor-react'
import { Filter } from '@/components/Pages/Products/Filter'
import { GetStaticProps } from 'next'
import { FilterContextProvider } from '@/contexts/pages/products/FilterContext'
import SelectedFilters from '@/components/Pages/Products/Filter/SelectedFilters'
import Product, { IProduct } from '@/components/Product'
import curolProductEx from '../../assets/product-ex.avif'
import watchProducEx from '../../assets/product-ex2.avif'
import curolZoomedEx from '../../assets/product-ex3.avif'
import blueProductEx from '../../assets/product-ex4.avif'
import prisma from '@/lib/prisma'

interface ProductsProps {
  colorContent: {
    id: number
    color: string
  }[]
  products: IProduct[]
}

export default function Products({ colorContent, products }: ProductsProps) {
  const [showFiltersContainer, setShowFilters] = useState(true)
  const [selectedPage, setSelectedPage] = useState(1)

  const toggleShowFilters = useCallback(() => {
    setShowFilters(!showFiltersContainer)
  }, [showFiltersContainer])

  const closeFilterContainer = useCallback(() => {
    setShowFilters(false)
  }, [])

  const selectPage = useCallback(
    (page?: number) => {
      if (page === -1) {
        /// previous page
        setSelectedPage(selectedPage - 1)

        return
      }

      if (!page) {
        /// next page
        setSelectedPage(selectedPage + 1)
        return
      }

      setSelectedPage(page)
    },
    [selectedPage],
  )

  useEffect(() => {
    if (window.innerWidth < 768) setShowFilters(false)
  }, [])

  return (
    <Container>
      <Breadcrumb>
        <Link href={'/products'}>Todos os produtos</Link>
      </Breadcrumb>
      <Banner>
        <Image src={BannerImage} alt="" fill />
      </Banner>
      <FilterLayout>
        <Header>
          <div>
            <button type="button" onClick={toggleShowFilters}>
              <List size={24} />
              {showFiltersContainer ? 'Fechar' : 'Abrir'} Filtros
            </button>
          </div>
          <div>
            <p>{products.length} Items</p>
          </div>
          <div>
            <select name="cars" id="cars">
              <option value="">Ordenar Por</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </Header>
        <BodyContent>
          <AsideFilterContainerBGMobile
            onClick={closeFilterContainer}
            className={showFiltersContainer ? 'active' : ''}
          />
          <AsideFilterContainer className={showFiltersContainer ? 'open' : ''}>
            <FilterContextProvider>
              <Filter colorContent={colorContent} type="colors" />
              <Filter type="sizes" />
              <Filter type="prices" />
              <SelectedFilters />
            </FilterContextProvider>
          </AsideFilterContainer>

          <ProductsContainer>
            {products.map((product) => (
              <Product
                key={product.id}
                productsByColor={product.productsByColor}
                generalInfo={{
                  id: product.id,
                  productName: product.productName,
                }}
              />
            ))}
          </ProductsContainer>
        </BodyContent>
        <PaginationContainer>
          <button onClick={() => selectPage(-1)}>
            <CaretLeft size={24} />
            Anterior
          </button>
          <div>
            <button className="active-page" onClick={() => selectPage(-1)}>
              1
            </button>
            <button onClick={() => selectPage(-1)}>2</button>
            <button onClick={() => selectPage(-1)}>3</button>
          </div>
          <button onClick={() => selectPage()}>
            Próximo
            <CaretRight size={24} />
          </button>
        </PaginationContainer>
      </FilterLayout>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const colorContent = [
    {
      color: 'purple',
      id: 1,
    },
    {
      color: 'red',
      id: 2,
    },
    {
      color: 'blue',
      id: 3,
    },
    {
      color: 'crimson',
      id: 4,
    },
    {
      color: 'pink',
      id: 5,
    },
    {
      color: 'gray',
      id: 6,
    },
    {
      color: 'brown',
      id: 7,
    },
    {
      color: 'deepskyblue',
      id: 8,
    },
    {
      color: 'yellow',
      id: 9,
    },
    {
      color: 'orange',
      id: 12,
    },
    {
      color: 'aliceblue',
      id: 354,
    },
  ]
  const videoProductEx =
    'https://assets.mixkit.co/videos/preview/mixkit-young-photographer-setting-up-his-camera-outdoors-34408-large.mp4'

  const allProductsRaw = await prisma.product.findMany()

  const allProductsColors = await prisma.productColor.findMany()

  const allImages = await prisma.image.findMany()

  const allProducts = allProductsRaw.map((product) => {
    return {
      ...product,
      productsByColor: allProductsColors
        .filter((productsColor) => productsColor.product_id === product.id)
        .map((item) => ({
          ...item,
          productsImages: allImages.filter(
            (actualImage) => actualImage.product_color_id === item.id,
          ),
        })),
    }
  })

  const formattedProducts = allProducts.map((product) => {
    return {
      id: product.id,
      productName: product.name,
      productDescription: product.description,
      productsByColor: product.productsByColor.map((productColor) => ({
        id: productColor.id,
        colorName: productColor.colorName,
        colorHex: productColor.colorHex,
        price: productColor.price,
        productImages: productColor.productsImages.map((prodImage) => ({
          id: prodImage.id,
          imageSrc: prodImage.imageSrc,
        })),
      })),
    }
  })

  return {
    props: { products: formattedProducts, colorContent },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  }
}
