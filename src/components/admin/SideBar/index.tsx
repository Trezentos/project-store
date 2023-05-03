import { MouseEvent, ReactNode, useCallback, useEffect } from 'react'
import { ConfigButtons, Container, MainMenu, PanelContent } from './styles'
import logoImgSrc from '../../../assets/logo2.png'
import { House, Package, Pencil, Gear, SignOut } from 'phosphor-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface SidebarProps {
  children: ReactNode
}

function Sidebar({ children }: SidebarProps) {
  const iconeSize = 24
  const router = useRouter()

  const handleActiveButton = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, page: string) => {
      const allButtons = document.querySelectorAll('#main-buttons button')
      allButtons.forEach((button) => {
        button.classList.remove('active')
      })

      e.currentTarget.classList.add('active')
      router.push(`${page}`)
    },
    [router],
  )

  useEffect(() => {
    const allButtons = document.querySelectorAll('#main-buttons button')
    allButtons[0].classList.add('active')
  }, [])

  return (
    <Container>
      <PanelContent>
        <Image src={logoImgSrc.src} alt="" fill />
        <MainMenu id="main-buttons">
          <h4>Menu Principal</h4>
          <button onClick={(e) => handleActiveButton(e, 'home')}>
            <House size={iconeSize} />
            Home
          </button>
          <button onClick={(e) => handleActiveButton(e, 'edit-menu')}>
            <Pencil size={iconeSize} />
            Editar Menu
          </button>
          <button onClick={(e) => handleActiveButton(e, 'products')}>
            <Package size={iconeSize} />
            Produtos
          </button>
        </MainMenu>
        <ConfigButtons>
          <button>
            <Gear size={iconeSize} />
            Configuraçoes
          </button>
          <button>
            <SignOut size={iconeSize} />
            Sair
          </button>
        </ConfigButtons>
      </PanelContent>
      {children}
    </Container>
  )
}

export default Sidebar
