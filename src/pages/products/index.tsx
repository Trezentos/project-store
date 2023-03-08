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
  ProductsContainer,
} from './styles'
import BannerImage from './banner.jpg'
import Link from 'next/link'
import { List } from 'phosphor-react'
import { Filter } from '@/components/Pages/Products/Filter'
import { GetStaticProps } from 'next'

interface ProductsProps {
  colorContent: {
    id: number
    color: string
  }[]
}

export default function Products({ colorContent }: ProductsProps) {
  const [showFiltersContainer, setShowFilters] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const toggleShowFilters = useCallback(() => {
    setShowFilters(!showFiltersContainer)
  }, [showFiltersContainer])

  const updateFilters = useCallback(
    (selectedFilter: string, childElement?: any) => {
      const IndexFoundFilter = selectedFilters.indexOf(selectedFilter)

      if (IndexFoundFilter !== -1) {
        setSelectedFilters(
          selectedFilters.filter((item) => selectedFilter !== item),
        )

        if (childElement) childElement.classList.remove('selected')

        return
      }

      setSelectedFilters((state) => [...state, selectedFilter])
      if (childElement) childElement.classList.add('selected')
    },
    [selectedFilters],
  )

  const clearFilters = useCallback(
    (options: string[]) => {
      console.log(
        selectedFilters.filter((selectedF) => !options.includes(selectedF)),
      )

      setSelectedFilters(
        selectedFilters.filter((selectedF) => !options.includes(selectedF)),
      )
    },
    [selectedFilters],
  )

  const closeFilterContainer = useCallback(() => {
    setShowFilters(false)
  }, [])

  useEffect(() => {
    console.log(selectedFilters)
    if (window.innerWidth < 768) setShowFilters(false)
  }, [selectedFilters])

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
            <p>200000 Items</p>
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
            <Filter
              updateFilters={updateFilters}
              clearFilters={clearFilters}
              colorContent={colorContent}
              type="colors"
            />
            <Filter
              updateFilters={updateFilters}
              clearFilters={clearFilters}
              type="sizes"
            />
            <Filter
              updateFilters={updateFilters}
              clearFilters={clearFilters}
              type="prices"
            />
          </AsideFilterContainer>

          <ProductsContainer>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </ProductsContainer>
        </BodyContent>
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

  return {
    props: {
      colorContent,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
