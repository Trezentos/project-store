import Product, { IProduct } from '@/components/Product'
import { api } from '@/lib/api'
import getManyProducts from '@/services/get-all-products'
import { ProductCategory } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Filter } from '@/components/Pages/Products/components/Filter'
import SelectedFilters from '@/components/Pages/Products/components/Filter/SelectedFilters'
import React, { useCallback, useEffect, useState } from 'react'
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
import Link from 'next/link'
import Image from 'next/image'
import { CaretLeft, CaretRight, List } from 'phosphor-react'
import { FilterContextProvider } from '@/contexts/pages/products/FilterContext'
import { ProductFilter } from '@/contexts/pages/admin/EditCategoriesContext'
import Filters from '@/components/Pages/Products/Filters'

interface CategoryPageProps {
  category: ProductCategory
  colorContent: {
    id: number
    color: string
  }[]
  products: IProduct[]
  activeFilters: ProductFilter[]
}

export default function CategoryPage({
  category,
  colorContent,
  products,
  activeFilters,
}: CategoryPageProps) {
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
        <Image src={category.imageBackgroundLink} alt="" fill />
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
            <FilterContextProvider value={{ colorContent, activeFilters }}>
              <Filters />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<ProductCategory[]>(
    '/edit-menu/categories/get-categories',
  )

  return {
    paths: data.map((category) => ({
      params: { category: category.hifen },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string

  const { data } = await api.get<ProductCategory>(
    `/edit-menu/categories/get-single-category/${category}`,
  )

  const { allProducts, colorContent, activeFilters } = await getManyProducts(
    data,
  )

  return {
    props: {
      category: data,
      products: allProducts,
      colorContent,
      activeFilters,
    },
    revalidate: 60 * 60 * 24, // Atualize a página a cada 24 horas
  }
}
