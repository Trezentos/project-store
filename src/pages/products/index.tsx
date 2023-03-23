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
import Product, { IProducts } from '@/components/Product'
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
  products: IProducts[]
}

export default function Products({ colorContent, products }: ProductsProps) {
  const [showFiltersContainer, setShowFilters] = useState(true)
  const [selectedPage, setSelectedPage] = useState(1)

  console.log(products)

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

      console.log('send the selected page')
    },
    [selectedPage],
  )

  useEffect(() => {
    if (window.innerWidth < 768) setShowFilters(false)
  }, [])

  return (
    <Container>
      <Breadcrumb>
        <Link href={'/'}>Compras</Link>
        <p>Sapatos</p>
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
            {products.map((product) => {
              return (
                <Product
                  key={product.productId}
                  productId={product.productId}
                  productsByColor={product.productsByColor}
                  productName={product.productName}
                />
              )
            })}
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

  const products: IProducts[] = [
    {
      productId: '302',
      productName: 'Creme Curology',
      productsByColor: [
        {
          id: '1',
          color: 'purple',
          price: 920,
          product: {
            id: '12',
            firstImage: curolProductEx,
            secondImage: blueProductEx,
          },
        },
        {
          id: '2',
          price: 120,
          color: 'crimson',
          product: {
            id: '13',
            firstImage: curolZoomedEx,
            secondImage: watchProducEx,
          },
        },
      ],
    },
    {
      productId: '36',
      productName: 'Creme Curology 1',
      productsByColor: [
        {
          id: '1',
          color: 'green',
          price: 120,
          product: {
            id: '12',
            firstImage: curolProductEx,
            secondImage: blueProductEx,
          },
        },
        {
          id: '2',
          color: 'orange',
          price: 580,
          product: {
            id: '13',
            firstImage: curolZoomedEx,
            secondImage: watchProducEx,
          },
        },
      ],
    },
    {
      productId: '43',
      productName: 'Creme Curology 2',
      productsByColor: [
        {
          id: '1',
          color: 'deepskyblue',
          price: 820,
          product: {
            id: '12',
            firstImage: curolProductEx,
            secondImage: blueProductEx,
          },
        },
        {
          id: '2',
          color: 'crimson',
          price: 120,
          product: {
            id: '13',
            firstImage: curolZoomedEx,
            secondImage: watchProducEx,
          },
        },
      ],
    },
    {
      productId: '1',
      productName: 'Creme Curology 3',
      productsByColor: [
        {
          id: '1',
          color: 'pink',
          price: 520,
          product: {
            id: '12',
            firstImage: curolProductEx,
            secondImage: blueProductEx,
          },
        },
        {
          id: '2',
          color: 'crimson',
          price: 320,
          product: {
            id: '13',
            firstImage: curolZoomedEx,
            secondImage: blueProductEx,
          },
        },
      ],
    },
    {
      productId: '2',
      productName: 'Creme Curology 4',
      productsByColor: [
        {
          color: 'white',
          id: '1',
          price: 580,
          product: {
            id: '3',
            firstImage: curolZoomedEx,
            secondImage: blueProductEx,
          },
        },
      ],
    },
    {
      productId: '257',
      productName: 'Creme Curology 4',
      productsByColor: [
        {
          color: 'white',
          id: '1',
          price: 580,
          product: {
            id: '3',
            firstImage: curolZoomedEx,
            secondImage: blueProductEx,
          },
        },
      ],
    },
  ]

  const allProductsRaw = await prisma.product.findMany()

  const allImages = await prisma.image.findMany()

  const allProducts = allProductsRaw.map((product) => {
    return {
      ...product,
      images: allImages.filter((image) => product.id === image.product_id),
    }
  })

  const formattedProducts = allProducts.map((product) => {
    return {
      id: product.id,
      color: product.color,
      price: product.price,
      productsByColor: [
        {
          id: product.images[0].id,
          firstImage: product.images[0].imageSrc,
          secondImage: product.images[1].imageSrc,
        },
      ],
    }
  })

  console.log(formattedProducts.length)

  return {
    props: {
      colorContent,
      products: formattedProducts,
    },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  }
}
