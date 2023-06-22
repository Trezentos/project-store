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
import LinksNavigation from './Components/LinksNavigation'
import { useContext, useEffect, useState } from 'react'
import { HeaderContext, IHeaderContent } from '@/contexts/HeaderContext'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext'
import { signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

export default function Header() {
  const { toggleMobileHeader, updateHeaderContents, headerContent } =
    useContext(HeaderContext)
  const { openCart } = useContext(CartContext)
  const { quantityItems } = useContext(CartContext)
  const { status } = useSession()

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
