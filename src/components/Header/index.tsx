import {
  Container,
  GeneralContent,
  GeneralOptions,
  MainContent,
  UserOptions,
} from './style'
import LogoImg from '../../assets/logo2.png'
import { MagnifyingGlass, HeartStraight, User, Bag, List } from 'phosphor-react'
import Image from 'next/image'
import FeaturedImage from '../../assets/pretty-woman.png'
import FeaturedImage2 from '../../assets/pretty-woman-2.png'
import LinksNavigation from './Components/LinksNavigation'
import { useContext, useEffect, useState } from 'react'
import { HeaderContext, IHeaderContent } from '@/contexts/HeaderContext'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { toggleMobileHeader, updateHeaderContents } = useContext(HeaderContext)
  const { openCart } = useContext(CartContext)
  const { products, quantityItems } = useContext(CartContext)
  const { status } = useSession()

  console.log(status)

  useEffect(() => {
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
        link: '/instashop',
      },
      {
        name: 'SALE',
      },
    ]

    updateHeaderContents(headerContents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {/* <ShipContent>
        </ShipContent> */}
      <MainContent>
        <button onClick={() => toggleMobileHeader()}>
          <List size={32} color="#160e14" />
        </button>
        <Link href={'/'}>
          <Image src={LogoImg} alt="" width={206} height={52} />
        </Link>
        <LinksNavigation />
        <GeneralOptions>
          <a>AJUDA</a>
          <GeneralContent>
            <a href="">
              <MagnifyingGlass size={18} />
            </a>
            {/* <a href="">
              <HeartStraight size={18} />
            </a> */}
            <div className="user-icon">
              <User size={18} />
              {status === 'authenticated' ? (
                <UserOptions className="user-options">
                  <p>
                    Gerencie a sua conta para fazer check-out mais rápido no
                    futuro e receber e-mails sobre seus pedidos, novos produtos,
                    eventos e ofertas especiais!
                  </p>
                  <Link href="/profile">Gerenciar Perfil</Link>
                  <button onClick={() => signOut()}>Sair</button>
                </UserOptions>
              ) : (
                <UserOptions className="user-options">
                  <p>
                    Crie uma conta para fazer check-out mais rápido no futuro e
                    receber e-mails sobre seus pedidos, novos produtos, eventos
                    e ofertas especiais!
                  </p>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Criar Conta</Link>
                </UserOptions>
              )}
            </div>
            <button type="button" onClick={openCart}>
              <Bag size={25} />
              {quantityItems !== 0 && <p>{quantityItems}</p>}
            </button>
          </GeneralContent>
        </GeneralOptions>
      </MainContent>
    </Container>
  )
}
