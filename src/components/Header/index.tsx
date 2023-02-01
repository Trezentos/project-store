import { Container, GeneralContent, GeneralOptions, MainContent } from './style'
import LogoImg from '../../assets/logo2.png'
import {
  MagnifyingGlass,
  HeartStraight,
  User,
  Bag,
  CaretDown,
} from 'phosphor-react'
import Image, { StaticImageData } from 'next/image'
import FeaturedImage from '../../assets/pretty-woman.png'
import FeaturedImage2 from '../../assets/pretty-woman-2.png'
import LinksNavigation, { IHeaderContent } from './Components/LinksNavigation'

export default function Header() {
  const headerContents: IHeaderContent[] = [
    {
      name: 'NEW',
      featuredImg: {
        imageUrl: FeaturedImage,
        name: 'Pretty woman 1',
      },
      subnavigation: [
        {
          name: 'Swinwear',
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
          name: 'Swin Top 2',
        },
        {
          name: 'Swin Bottom2',
        },
        {
          name: 'Swin Middle2',
        },
      ],
    },
    {
      name: 'SWIN',
      featuredImg: {
        imageUrl: FeaturedImage2,
        name: 'Suach a Pretty woman 2',
      },
      subnavigation: [
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

  return (
    <Container>
      {/* <ShipContent>
        </ShipContent> */}
      <MainContent>
        <Image src={LogoImg} alt="" width={206} height={52} />
        <LinksNavigation headerContents={headerContents} />
        <GeneralOptions>
          <a>AJUDA</a>
          <GeneralContent>
            <a>
              BR R$ <CaretDown size={15} />
            </a>
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
