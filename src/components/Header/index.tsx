import { Container, GeneralContent, GeneralOptions, MainContent } from './style'
import LogoImg from '../../assets/logo2.png'
import { MagnifyingGlass, HeartStraight, User, Bag, List } from 'phosphor-react'
import Image from 'next/image'
import FeaturedImage from '../../assets/pretty-woman.png'
import FeaturedImage2 from '../../assets/pretty-woman-2.png'
import LinksNavigation, { IHeaderContent } from './Components/LinksNavigation'
import { useState } from 'react'

export default function Header() {
  const [mobileHeaderActive, setMobileHeaderActive] = useState(false)
  const headerContents: IHeaderContent[] = [
    {
      name: 'NEW',
      featuredImg: {
        imageUrl: FeaturedImage,
        name: 'Pretty woman 1',
      },
      subnavigation: [
        [
          {
            name: 'Swinwear 1',
          },
          {
            name: 'Swin Top',
          },
          {
            name: 'Swin 2',
          },
          {
            name: 'Swin Middle',
          },
          {
            name: 'Swin Top 2',
          },
        ],
        [
          {
            name: 'Swinwear 2',
          },
          {
            name: 'Swin Top',
          },
          {
            name: 'bbbbbbbbbbb',
          },
          {
            name: 'Swin Middle',
          },
          {
            name: 'Swin Bottom2',
          },
          {
            name: 'Swin Middle2',
          },
        ],
        [
          {
            name: 'Swinwear 3',
          },
          {
            name: 'Swin Top',
          },
          {
            name: 'Swin Bottom',
          },
          {
            name: 'Swin Middle',
          },
          {
            name: 'aaaaaa',
          },
          {
            name: 'Swin Middle2',
          },
        ],
      ],
    },
    {
      name: 'SWIN',
      featuredImg: {
        imageUrl: FeaturedImage2,
        name: 'Suach a Pretty woman 2',
      },
      subnavigation: [
        [
          {
            name: 'SWIMSWIM1',
          },
          {
            name: 'SWIMSWIM2',
          },
          {
            name: 'SWIMSWIM3',
          },
          {
            name: 'SWIMSWIM4',
          },
          {
            name: 'SWIMSWIM5',
          },
          {
            name: 'SWIMSWIM6',
          },
          {
            name: 'SWIMSWIM7',
          },
        ],
      ],
    },
    {
      name: 'CLOTHING',
    },
    {
      name: 'ACESSORIES',
    },
    {
      name: 'LOOKBOOK',
    },
    {
      name: 'INSTASHOP',
    },
    {
      name: 'SALE',
    },
  ]

  function toggleMobileHeaderActive() {
    setMobileHeaderActive(!mobileHeaderActive)
  }

  return (
    <Container>
      {/* <ShipContent>
        </ShipContent> */}
      <MainContent>
        <button onClick={() => toggleMobileHeaderActive()}>
          <List size={32} color="#160e14" />
        </button>
        <Image src={LogoImg} alt="" width={206} height={52} />
        <LinksNavigation
          headerContents={headerContents}
          mobileHeaderActive={mobileHeaderActive}
          toggleMobileHeader={toggleMobileHeaderActive}
        />
        <GeneralOptions>
          <a>AJUDA</a>
          <GeneralContent>
            <a href="">
              <MagnifyingGlass size={18} />
            </a>
            <a href="">
              <HeartStraight size={18} />
            </a>
            <a href="">
              <User size={18} />
            </a>
            <a href="">
              <Bag size={25} />
            </a>
          </GeneralContent>
        </GeneralOptions>
      </MainContent>
    </Container>
  )
}
