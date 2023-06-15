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
import { prisma } from '@/lib/prisma'
import getAllProducts from '@/services/get-all-products'

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

  const products = await getAllProducts()

  return {
    props: { products, colorContent },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  }
}
