import { InstagramContext } from '@/context/InstagramContext'
import Image from 'next/image'
import { useCallback, useContext } from 'react'
import {
  AccordionAsideFilter,
  AsideFilter as AsideFilterContainer,
  AsideHeader,
  AsideOptions,
  Banner,
  BodyContent,
  Breadcrumb,
  CircleOption,
  Container,
  FilterLayout,
  Header,
  ProductsContainer,
} from './styles'
import BannerImage from './banner.jpg'
import Link from 'next/link'
import { Hamburger, List, Minus, Plus } from 'phosphor-react'

export default function Products() {
  const expandAccordion = useCallback((index: number) => {
    const asideToShow = document.querySelector(`[id=aside-filter-${index}]`)

    console.log(asideToShow)

    asideToShow?.classList.toggle('active')
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
            <button type="button">
              <List size={24} />
              Fechar Filtros
            </button>
          </div>
          <div>
            <p>7 items</p>
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
          <AsideFilterContainer>
            <AccordionAsideFilter>
              <AsideHeader>
                <button onClick={() => expandAccordion(1)}>
                  <h3>Color</h3>
                  <Plus size={22} />
                  {/* <Minus size={22} /> */}
                </button>
              </AsideHeader>
              <AsideOptions id="aside-filter-1">
                <ul>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                </ul>
              </AsideOptions>
            </AccordionAsideFilter>
            <AccordionAsideFilter>
              <AsideHeader>
                <button onClick={() => expandAccordion(2)}>
                  <h3>Color</h3>
                  <Plus size={22} />
                  {/* <Minus size={22} /> */}
                </button>
              </AsideHeader>
              <AsideOptions id="aside-filter-2">
                <ul>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <CircleOption color="blue" />
                    </a>
                  </li>
                </ul>
              </AsideOptions>
            </AccordionAsideFilter>
          </AsideFilterContainer>
          <ProductsContainer></ProductsContainer>
        </BodyContent>
      </FilterLayout>
    </Container>
  )
}
